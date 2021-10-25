import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: (() => {
          console.log(process.env);
          return "arn:aws:sqs:ap-southeast-1:530274274671:SendEmailQueue";
        })(),
        batchSize: 5,
      },
    },
  ],
};
