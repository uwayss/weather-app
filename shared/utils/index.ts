// Centralized exports for utility functions
export * from "@/helpers/api";
export * from "@/helpers/storage";
export * from "@/helpers/time";
export * from "@/helpers/weather";

// Common utility types
export type AsyncFunction<T = void> = () => Promise<T>;
export type ErrorCallback = (error: Error) => void;

// Utility functions
export const isNullOrUndefined = (value: any): value is null | undefined => {
  return value === null || value === undefined;
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
