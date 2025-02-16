export {};

declare global {
  interface Window {
    TelegramWebviewProxy: {
      postEvent: (event: string, data: string) => void;
    };
  }
}

export enum SocketCode {
  CREATE_ROOM = "createRoom",
}

export enum EventCode {
  START_GAME = "startGame",
}
