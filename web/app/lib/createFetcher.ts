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
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  };

  return fetcher;
};
