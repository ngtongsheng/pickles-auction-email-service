import { AWSError } from "aws-sdk";
import { ApiResponse, formatResponse } from "./apiGateway";

export const autoCatch = async (
  method: () => Promise<ApiResponse>
): Promise<ApiResponse> => {
  try {
    return await method();
  } catch (error) {
    return formatResponse(
      {
        ...error,
      },
      (<AWSError>error).statusCode
    );
  }
};
