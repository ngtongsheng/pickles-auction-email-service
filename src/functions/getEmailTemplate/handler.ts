import "source-map-support/register";

import { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { autoCatch } from "@libs/autoCatch";

const ses = new SES();
// const sqs = new SQS();

const getEmailTemplate: ValidatedEventAPIGatewayProxyEvent<
  Record<string, never>
> = (event) =>
  autoCatch(async () => {
    const { TemplateName } = event.queryStringParameters;

    const params = {
      TemplateName,
    };

    const data = await ses.getTemplate(params).promise();

    return formatResponse({
      ...data.$response.data,
    });
  });

export const main = middyfy(getEmailTemplate);
