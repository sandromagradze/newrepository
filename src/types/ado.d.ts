interface AdoceanApi {
  config?: (options: {
    mode: string;
    xml: boolean;
    characterEncoding: boolean;
  }) => void;

  preview?: (options: {
    enabled: boolean;
    emiter: string;
    id: string;
  }) => void;

  master?: (options: {
    id: string;
    server: string;
  }) => void;

  placement?: (options: {
    id: string;
    server: string;
  }) => void;

  slave?: (
    id: string,
    options: {
      myMaster: string;
    }
  ) => void;
}

declare global {
  interface Window {
    ado?: AdoceanApi;
  }
}

export {};
