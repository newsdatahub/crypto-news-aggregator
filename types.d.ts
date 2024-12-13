import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }

  interface Window {
    fetch: jest.Mock;
  }
}

export {};