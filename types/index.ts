export {};

declare global {
  interface Window {
    TelegramWebviewProxy: {
      postEvent: (event: string, data: string) => void;
    };
  }
}
