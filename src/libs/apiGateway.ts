import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { AWSError } from "aws-sdk";

import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};

export type ApiResponse = {
  statusCode: number;
  body: string;
};

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatResponse = (
  response: Record<string, unknown> | AWSError,
  statusCode = 200
): ApiResponse => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
