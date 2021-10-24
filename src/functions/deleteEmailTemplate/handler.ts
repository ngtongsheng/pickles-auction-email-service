import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { SES } from "aws-sdk";
import { EMAIL_TEMPLATE_SCHEMA } from "@functions/schema";

const ses = new SES();

const deleteEmailTemplate: ValidatedEventAPIGatewayProxyEvent<
  typeof EMAIL_TEMPLATE_SCHEMA
> = async (event) => {
  const { name } = event.body;

  const params = {
    TemplateName: name,
  };

  const err = await ses.deleteTemplate(params);

  if (err) {
    throw err;
  }

  return formatJSONResponse({
    message: `Successfully delete ${name} email template.`,
    event,
  });
};

export const main = middyfy(deleteEmailTemplate);
