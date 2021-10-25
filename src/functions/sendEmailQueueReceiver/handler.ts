import "source-map-support/register";

import { SES, SNS } from "aws-sdk";
import { SQSHandler } from "aws-lambda/trigger/sqs";
import {
  SendBulkTemplatedEmailRequest,
  SendBulkTemplatedEmailResponse,
} from "aws-sdk/clients/ses";

const ses = new SES();
const sns = new SNS();

const sendEmailQueueReceiver: SQSHandler = async (event) => {
  const sendBulkTemplatedEmailparams = JSON.parse(
    event.Records[0].body
  ) as SendBulkTemplatedEmailRequest;

  try {
    const data = await ses
      .sendBulkTemplatedEmail(sendBulkTemplatedEmailparams)
      .promise();

    const sendEmailResponse = data.$response
      .data as SendBulkTemplatedEmailResponse;

    const unsuccessfulEmails = sendEmailResponse.Status.filter(
      ({ Status }) => Status !== "Success"
    );

    if (unsuccessfulEmails.length) {
      const snsPublishParams = {
        Message: JSON.stringify({ unsuccessfulEmails }),
        TopicArn: "arn:aws:sns:ap-southeast-1:530274274671:SendEmailErrorTopic",
      };

      await sns.publish(snsPublishParams).promise();
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const main = sendEmailQueueReceiver;
