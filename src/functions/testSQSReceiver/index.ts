import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: "arn:aws:sqs:ap-southeast-1:530274274671:TestSQSQueue",
    },
  ],
};
