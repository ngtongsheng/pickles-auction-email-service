import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: "arn:aws:sqs:${env:REGION}:${env:ACCOUNT_ID}:SendEmailQueue",
        batchSize: 5,
      },
    },
  ],
};
