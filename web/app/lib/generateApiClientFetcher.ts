import Cookies from "js-cookie";
import { FetcherOptions, createFetcher } from "./createFetcher";
import { AuthTokensResponse } from "./types/authTypes";
import { ApiError, UnauthorizedError } from "../shared/ApiErrorGuard";

const generateApiClientFetcher = (baseURL: string, headers?: HeadersInit) => {
  const fetcher = createFetcher({ baseURL, headers });

  const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const refreshTokenUrl = "/auth/refresh";

    try {
      const response = await fetcher<AuthTokensResponse>(refreshTokenUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        id: newId,
      } = response;

      Cookies.set("accessToken", newAccessToken, {
        expires: new Date(
          Date.now() +
            Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN) || 0
        ),
      });
      Cookies.set("refreshToken", newRefreshToken, {
        expires: new Date(
          Date.now() +
            Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN) || 0
        ),
      });
      Cookies.set("id", newId.toString(), {
        expires: new Date(
          Date.now() +
            Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN) || 0
        ),
      });

      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  const fetchWithInterceptors = async <T>(
    url: string,
    options: FetcherOptions = {}
  ): Promise<T> => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    try {
      return await fetcher<T>(url, options);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        if (error.statusCode === 401) {
          const refreshToken = Cookies.get("refreshToken");
          if (refreshToken) {
            try {
              const newAccessToken = await refreshAccessToken(refreshToken);

              options.headers = {
                ...options.headers,
                Authorization: `Bearer ${newAccessToken}`,
              };

              return await fetcher<T>(url, options);
            } catch (refreshError) {
              location.href = "/login";
            }
          } else {
            location.href = "/login";
          }
        }
        throw new ApiError(error.name, error.message, error.statusCode);
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
  };

  return fetchWithInterceptors;
};

export default generateApiClientFetcher;
