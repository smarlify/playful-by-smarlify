declare global {
  interface Window {
    trackEvent?: (eventName: string, parameters?: Record<string, any>) => void;
  }
}

export {};
