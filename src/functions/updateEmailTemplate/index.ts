import { EMAIL_TEMPLATE_OBJECT_SCHEMA } from "@functions/schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "put",
        path: "emailTemplate",
        request: {
          schema: {
            "application/json": EMAIL_TEMPLATE_OBJECT_SCHEMA,
          },
        },
      },
    },
  ],
};
