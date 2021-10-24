import { EMAIL_TEMPLATE_SCHEMA } from "@functions/schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "delete",
        path: "emailTemplate",
        request: {
          schema: {
            "application/json": EMAIL_TEMPLATE_SCHEMA,
          },
        },
      },
    },
  ],
};
