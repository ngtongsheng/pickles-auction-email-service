import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sns: {
        arn: "arn:aws:sns:ap-southeast-1:530274274671:SendEmailErrorTopic",
      },
    },
  ],
};
