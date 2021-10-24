import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { SEND_EMAIL_SCHEMA } from "@functions/schema";
import { autoCatch } from "@libs/autoCatch";

const ses = new SES();

const sendEmail: ValidatedEventAPIGatewayProxyEvent<typeof SEND_EMAIL_SCHEMA> =
  (event) =>
    autoCatch(async () => {
      const { TemplateName, Source, Destinations } = event.body;

      const params = {
        Template: TemplateName,
        Destinations,
        Source,
        DefaultTemplateData: "{}",
      };

      console.log(params);

      const data = await ses.sendBulkTemplatedEmail(params).promise();

      return formatResponse({
        ...data.$response.data,
      });
    });

export const main = middyfy(sendEmail);
