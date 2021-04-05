interface ImportMeta {
  readonly env: ImportMetaEnv & {
    VITE_API_URL: string;
    VITE_PAYPAL_HOSTED_BUTTON_ID: string;
  };
}

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    onNeedRefresh?(): void;
    onOfflineReady?(): void;
  }

  export const registerSW: (options?: RegisterSWOptions) => () => void;
}
