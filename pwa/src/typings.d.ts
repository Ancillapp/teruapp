interface ImportMeta {
  readonly env: ImportMetaEnv & {
    VITE_API_URL: string;
    VITE_PAYPAL_HOSTED_BUTTON_ID: string;
  };
}
