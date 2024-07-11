import { RawAxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";
import { FetcherReturnType, createFetcher } from "./createFetcher";

// TODO: move to env
const generateApiClientFetcher = (
  baseURL: string,
  headers?: RawAxiosRequestHeaders
): FetcherReturnType => {
  const axiosInstance = createFetcher({ baseURL, headers: { ...headers } });

  const refreshAccessToken = async (refreshToken: string) => {
    const refreshTokenUrl = "/auth/refresh";

    try {
      const { data } = await axiosInstance.get(refreshTokenUrl, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;
      const newId = data.id;

      Cookies.set("accessToken", newAccessToken, {
        expires: new Date(
          Date.now() + process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN
        ),
      });
      Cookies.set("refreshToken", newRefreshToken, {
        expires: new Date(
          Date.now() + process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN
        ),
      });
      Cookies.set("id", newId, {
        expires: new Date(
          Date.now() + process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN
        ),
      });

      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  axiosInstance.interceptors.request.use(
    (request) => {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        return request;
      }

      if (!request.headers.Authorization) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401) {
        const refreshToken = Cookies.get("refreshToken");

        if (refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Failed to refresh access token:", refreshError);
            location.href = "/login";
          }
        }

        location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default generateApiClientFetcher;
