import Cookies from "js-cookie";
import { FetcherOptions, createFetcher } from "./createFetcher";
import { AuthTokensResponse } from "./types/authTypes";

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
    } catch (error: any) {
      if (error.status === 401) {
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
            console.error("Failed to refresh access token:", refreshError);
            location.href = "/login";
          }
        } else {
          location.href = "/login";
        }
      }
      throw error;
    }
  };

  return fetchWithInterceptors;
};

export default generateApiClientFetcher;
