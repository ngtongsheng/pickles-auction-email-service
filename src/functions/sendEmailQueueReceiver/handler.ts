import "source-map-support/register";

import { SES, SNS } from "aws-sdk";
import { SQSHandler } from "aws-lambda/trigger/sqs";
import {
  SendBulkTemplatedEmailRequest,
  SendBulkTemplatedEmailResponse,
} from "aws-sdk/clients/ses";

const ses = new SES();
const sns = new SNS();

const sendEmailQueueReceiver: SQSHandler = async ({ Records }) => {
  try {
    await Promise.all([
      Records.map(async ({ body }) => {
        const params = JSON.parse(body) as SendBulkTemplatedEmailRequest;
        const data = await ses.sendBulkTemplatedEmail(params).promise();
        const response = data.$response.data as SendBulkTemplatedEmailResponse;

        const unsuccessfulEmails = response.Status.filter(
          ({ Status }) => Status !== "Success"
        );

        if (unsuccessfulEmails.length) {
          const snsPublishParams = {
            Message: JSON.stringify({ unsuccessfulEmails }),
            TopicArn: `arn:aws:sns:${process.env.REGION}:${process.env.ACCOUNT_ID}:SendEmailErrorTopic`,
          };

          await sns.publish(snsPublishParams).promise();
        }
      }),
    ]);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const main = sendEmailQueueReceiver;
