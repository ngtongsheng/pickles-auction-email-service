import type { AWS } from "@serverless/typescript";

import getEmailTemplate from "@functions/getEmailTemplate";
import createEmailTemplate from "@functions/createEmailTemplate";
import updateEmailTemplate from "@functions/updateEmailTemplate";
import deleteEmailTemplate from "@functions/deleteEmailTemplate";
import sendEmail from "@functions/sendEmail";
import sendEmailQueueReceiver from "@functions/sendEmailQueueReceiver";

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
  plugins: ["serverless-bundle", "serverless-offline"],
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
      ACCOUNT_ID: "530274274671",
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "ses:CreateTemplate",
              "ses:DeleteTemplate",
              "ses:UpdateTemplate",
              "ses:GetTemplate",
            ],
            // Still figuring out why arn:aws:ses:${self:custom.region}:*:* is not working for ses template related action
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["ses:SendBulkTemplatedEmail"],
            Resource: "arn:aws:ses:${self:custom.region}:*:*",
          },
          {
            Effect: "Allow",
            Action: ["sqs:SendMessage"],
            Resource: "arn:aws:sqs:${self:custom.region}:*:*",
          },
        ],
      },
    },
  },
  functions: {
    getEmailTemplate,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    sendEmail,
    sendEmailQueueReceiver,
  },
  resources: {
    Resources: {
      SendEmailQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SendEmailQueue",
          ReceiveMessageWaitTimeSeconds: 5,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
