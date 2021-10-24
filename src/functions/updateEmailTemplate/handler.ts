import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { EMAIL_TEMPLATE_SCHEMA } from "@functions/schema";
import { autoCatch } from "@libs/autoCatch";

const ses = new SES();

const updateEmailTemplate: ValidatedEventAPIGatewayProxyEvent<
  typeof EMAIL_TEMPLATE_SCHEMA
> = (event) =>
  autoCatch(async () => {
    const { TemplateName, HtmlPart, SubjectPart } = event.body;

    const params = {
      Template: {
        TemplateName,
        HtmlPart,
        SubjectPart,
      },
    };

    const data = await ses.updateTemplate(params).promise();

    return formatResponse({
      ...data.$response.data,
    });
  });

export const main = middyfy(updateEmailTemplate);
