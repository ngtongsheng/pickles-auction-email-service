import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { ValidatedEventAPIGatewayProxyEvent } from "./apiGateway";

export const middyfy = <T>(
  handler: ValidatedEventAPIGatewayProxyEvent<T>
): unknown => {
  return middy(handler).use(middyJsonBodyParser());
};
