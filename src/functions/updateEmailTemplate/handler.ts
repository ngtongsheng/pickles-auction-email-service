import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { EMAIL_TEMPLATE_OBJECT_SCHEMA } from "@functions/schema";

const ses = new SES();

const updateEmailTemplate: ValidatedEventAPIGatewayProxyEvent<
  typeof EMAIL_TEMPLATE_OBJECT_SCHEMA
> = async (event) => {
  const { name, subject, body } = event.body;

  const params = {
    Template: {
      TemplateName: name,
      HtmlPart: body,
      SubjectPart: subject,
    },
  };

  const err = await ses.updateTemplate(params).promise();

  if (err) {
    throw err;
  }

  return formatJSONResponse({
    message: `Successfully update ${name} email template.`,
    event,
  });
};

export const main = middyfy(updateEmailTemplate);
