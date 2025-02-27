// Centralized exports for custom hooks
export * from "@/hooks/useDebounce";
export * from "@/hooks/useFetchLocations";
export * from "@/hooks/useFetchWeather";
import React from "react";
// Common hooks
export const useBoolean = (initialState = false) => {
  const [value, setValue] = React.useState(initialState);

  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  const toggle = React.useCallback(() => setValue((prev) => !prev), []);

  return [value, { setTrue, setFalse, toggle }] as const;
};

export const useMount = (callback: () => void) => {
  React.useEffect(() => {
    callback();
  }, []);
};

export const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const isFirstMount = React.useRef(true);

  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    return effect();
  }, deps);
};
