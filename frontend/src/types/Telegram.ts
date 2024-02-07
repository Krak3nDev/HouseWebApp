export interface Window {
    Telegram: {
        WebApp: {
            close: () => void;
        };
    };
}


export interface InitDataUnsafe {
  start_param?: string;
}