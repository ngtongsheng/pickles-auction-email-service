import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { autoCatch } from "@libs/autoCatch";
import { SES } from "aws-sdk";

const ses = new SES();

const testSQSReceiver: ValidatedEventAPIGatewayProxyEvent<
  Record<string, never>
> = (event) =>
  autoCatch(async () => {
    console.log(event);

    const params = {
      Template: "hello",
      Source: "tongsheng@webgenerative.art",
      Destinations: [
        {
          Destination: {
            ToAddresses: ["ngtongsheng@gmail.com"],
          },
        },
      ],
      DefaultTemplateData: "{}",
    };

    const data = await ses.sendBulkTemplatedEmail(params).promise();

    return formatResponse({
      ...data.$response.data,
    });
  });

export const main = middyfy(testSQSReceiver);
