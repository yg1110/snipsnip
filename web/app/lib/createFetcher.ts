import { ApiError, UnauthorizedError } from "../shared/ApiErrorGuard";

type FetcherProps = {
  baseURL: string;
  headers?: HeadersInit;
};

export type FetcherOptions = RequestInit & {
  headers?: HeadersInit;
};

export const createFetcher = ({ baseURL, headers = {} }: FetcherProps) => {
  const fetcher = async <T>(
    url: string,
    options: FetcherOptions = {}
  ): Promise<T> => {
    const finalHeaders = { ...headers, ...options.headers };

    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: finalHeaders,
      credentials: "include",
      signal: AbortSignal.timeout(1000),
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const error = JSON.parse(text);
        throw new ApiError(error.error, error.message, error.statusCode);
      } catch (error) {
        if (response.status === 401) {
          throw new UnauthorizedError("Unauthorized");
        }
        if (error instanceof SyntaxError) {
          throw new ApiError(error.name, error.message, 500);
        }
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

    const data: T = await response.json();
    return data;
  };
  return fetcher;
};
