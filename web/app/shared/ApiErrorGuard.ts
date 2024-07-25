export class ApiError extends Error {
  constructor(
    public error: string,
    public message: string,
    public statusCode: number
  ) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export async function ApiErrorGuard<T>(apiCall: Promise<T>): Promise<T> {
  try {
    return await apiCall;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new ApiError(error.error, error.message, error.statusCode);
    }
    throw new ApiError(
      "Unknown error",
      "에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
      500
    );
  }
}
