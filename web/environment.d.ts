export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HOST: string;
      NEXT_PUBLIC_BASE_API: string;
      NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN: string;
      NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}
