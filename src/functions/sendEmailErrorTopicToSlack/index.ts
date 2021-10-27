import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sns: {
        arn: "arn:aws:sns:${env:REGION}:${env:ACCOUNT_ID}:SendEmailErrorTopic",
      },
    },
  ],
};
