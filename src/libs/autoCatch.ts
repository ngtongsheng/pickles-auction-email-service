import { AWSError } from "aws-sdk";
import { ApiResponse, formatResponse } from "./apiGateway";

export const autoCatch = async (
  method: () => Promise<ApiResponse>
): Promise<ApiResponse> => {
  try {
    return await method();
  } catch (error) {
    const { message, statusCode } = <AWSError>error;
    return formatResponse(
      {
        message,
        ...error,
      },
      statusCode
    );
  }
};
