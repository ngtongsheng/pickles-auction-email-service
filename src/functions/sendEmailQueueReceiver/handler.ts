import "source-map-support/register";

import { SES } from "aws-sdk";
import { SQSHandler } from "aws-lambda/trigger/sqs";
import { SendBulkTemplatedEmailRequest } from "aws-sdk/clients/ses";

const ses = new SES();

const sendEmailQueueReceiver: SQSHandler = async (event) => {
  const message = JSON.parse(
    event.Records[0].body
  ) as SendBulkTemplatedEmailRequest;

  try {
    await ses.sendBulkTemplatedEmail(message).promise();
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const main = sendEmailQueueReceiver;
