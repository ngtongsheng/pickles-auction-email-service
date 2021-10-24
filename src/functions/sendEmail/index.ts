import { SEND_EMAIL_SCHEMA } from "@functions/schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "sendEmail",
        request: {
          schema: {
            "application/json": SEND_EMAIL_SCHEMA,
          },
        },
      },
    },
  ],
};
