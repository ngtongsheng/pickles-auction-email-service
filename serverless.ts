import type { AWS } from "@serverless/typescript";

import getEmailTemplate from "@functions/getEmailTemplate";
import createEmailTemplate from "@functions/createEmailTemplate";
import updateEmailTemplate from "@functions/updateEmailTemplate";
import deleteEmailTemplate from "@functions/deleteEmailTemplate";
import sendEmail from "@functions/sendEmail";

const serverlessConfiguration: AWS = {
  service: "pickles-auction-email-service",
  frameworkVersion: "2",
  custom: {
    region: "${opt:region, self:provider.region}",
    stage: "${opt:stage, self:provider.stage}",
    ["serverless-offline"]: {
      httpPort: 3000,
      babelOptions: {
        presets: ["env"],
      },
    },
  },
  package: {
    individually: true,
  },
  plugins: [
    "serverless-bundle",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "ap-southeast-1",
    usagePlan: {
      throttle: {
        burstLimit: 1,
        rateLimit: 1,
      },
    },
    apiGateway: {
      apiKeys: [
        {
          name: "EmailServiceKey",
        },
      ],
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      REGION: "${self:custom.region}",
      STAGE: "${self:custom.stage}",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    getEmailTemplate,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    sendEmail,
  },
  resources: {
    Resources: {
      SendEmailQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SendEmailQueue",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
