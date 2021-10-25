import "source-map-support/register";

import axios from "axios";
import { SNSHandler } from "aws-lambda/trigger/sns";

const sendEmailErrorTopicToSlack: SNSHandler = async (event) => {
  const { unsuccessfulEmails } = JSON.parse(event.Records[0].Sns.Message);

  await axios.post(
    "https://hooks.slack.com/services/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",
    {
      blocks: unsuccessfulEmails.map(({ Status, Error }) => {
        return {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${Status}\n${Error}`,
          },
        };
      }),
    }
  );
};

export const main = sendEmailErrorTopicToSlack;
