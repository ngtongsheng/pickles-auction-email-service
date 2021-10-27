## Senior Principal Front-end Engineer take home task by Ng Tong Sheng

Total time spent on this project: approximately 14 hours in 4 days, this includes time spent reading and video watching, and consultation time with AWS architect. 

## About the boilerplate

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Before you start

This project is for demo purpose so some of the variable like region, account id & slack incoming hook path are hardcoded. Please change the value in `.env` file before you start.

> Since this is the 1st time i am doing this, so i am not sure if i should hardcode account id in environment variable, more than happy to learn from any expert.

## Development & deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Locally

Run `npm run dev` to start local development on port 3000.

### Deploy

Run `npm run deploy` to deploy to AWS, there will be a wizard to guide you thru.

## Things i compromised due to limited time
- I am yet to learn how to 

Before you can send email, you need to create an email template using 
```
POST /dev/emailTemplate
{
    "TemplateName": "welcome",
    "HtmlPart": "<b>Welcome to Pickles Acution {{name}}!</b>",
    "SubjectPart": "Welcome {{name}}"
}
```

After you have the template, you can then use `/dev/sendEmail` to send email in bulks.
```
POST /dev/sendEmail
{
    "TemplateName": "welcome",
    "Source": "sender@pickles.com.au",
    "Destinations": [{
        "Destination": {
            "ToAddresses": ["recipient-john@gmail.com"]
        },
        "ReplacementTemplateData": "{ \"name\":\"John\" }"
    }, {
        "Destination": {
            "ToAddresses": ["recipient-jane@gmail.com"]
        },
        "ReplacementTemplateData": "{ \"name\":\"Jane\" }"
    }],
    "DefaultTemplateData": "{ \"name\":\"my friend\" }"
}

```
Make you have a verified sender domain following this guide:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domain-procedure.html

And verify recipients manually following this guide:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html

## Diagrams

### Architecture
For this task i am demostrating bulk email sending using SQS & SES, and do demo purpose i also added feature to push message to slack when emails fail to send. This exercise is only showing a very simplistic view, which might not tackling some of the real world senarios, we can drill down more together when we get chance to meet :).

![alt text](https://pickles-auction-images.s3.ap-southeast-1.amazonaws.com/diagram-1.png)

### Flow
![alt text](https://pickles-auction-images.s3.ap-southeast-1.amazonaws.com/diagram-2.png)

## Things i compromised due to limited time
- I am yet to learn how to properly do unit test but i am happy to share my experience with unit testing on front end apps.
- The project is hardcoded to one environment & region only.
- The deployment is done manually, no deployment automation is implemented in this project.
- Only able to send text email, attachment is currently unsupported.
- Bounce email, dead-letter queue and other error are not being handled yet.
- For demo purpose, wait receiver wait time and batch size has set to 5seconds and 5 maximun items in queue.

## Packages used in this project

- [aws-sdk](https://www.npmjs.com/package/aws-sdk): use this to communicate with AWS.
- [serverless-bundle](https://www.npmjs.com/package/serverless-bundle) use this to simplify our serverless project configuration.
- [serverless-dotenv-plugin](https://www.npmjs.com/package/serverless-dotenv-plugin) use this to enable `.env` variable into lambda environment.
- [serverless-offline](https://www.npmjs.com/package/serverless-offline) use this to run our application and Lambda functions locally.
- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
