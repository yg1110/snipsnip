import { ApiError } from "../shared/ApiError";

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
      signal: AbortSignal.timeout(2000),
    });

    if (!response.ok) {
      try {
        const text = await response.text();
        const error = JSON.parse(text);
        throw new ApiError(error.message, error.statusCode);
      } catch (error) {
        if (response.status === 401) {
          throw new ApiError("Unauthorized", 401);
        }
        if (error instanceof SyntaxError) {
          throw new ApiError(error.message, 500);
        }
        if (error instanceof ApiError) {
          throw new ApiError(error.message, error.statusCode);
        }
        throw new ApiError(
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
