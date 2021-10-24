import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { EMAIL_TEMPLATE_SCHEMA } from "@functions/schema";
import { autoCatch } from "@libs/autoCatch";

const ses = new SES();

const createEmailTemplate: ValidatedEventAPIGatewayProxyEvent<
  typeof EMAIL_TEMPLATE_SCHEMA
> = (event) =>
  autoCatch(async () => {
    const { name, subject, body } = event.body;

    const params = {
      Template: {
        TemplateName: name,
        HtmlPart: body,
        SubjectPart: subject,
      },
    };

    const data = await ses.createTemplate(params).promise();

    return formatResponse({
      ...data.$response.data,
    });
  });

export const main = middyfy(createEmailTemplate);
