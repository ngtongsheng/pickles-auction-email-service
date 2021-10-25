import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SQS } from "aws-sdk";
import { SEND_EMAIL_SCHEMA } from "@functions/schema";
import { autoCatch } from "@libs/autoCatch";

const sqs = new SQS();

const sendEmail: ValidatedEventAPIGatewayProxyEvent<typeof SEND_EMAIL_SCHEMA> =
  (event) =>
    autoCatch(async () => {
      const {
        TemplateName,
        Source,
        Destinations,
        DefaultTemplateData = "{}",
      } = event.body;

      const QueueUrl = `https://sqs.ap-southeast-1.amazonaws.com/530274274671/SendEmailQueue`;

      const data = await sqs
        .sendMessage({
          QueueUrl,
          MessageBody: JSON.stringify({
            Template: TemplateName,
            Source,
            Destinations,
            DefaultTemplateData,
          }),
        })
        .promise();

      return formatResponse({
        ...data.$response.data,
      });
    });

export const main = middyfy(sendEmail);
