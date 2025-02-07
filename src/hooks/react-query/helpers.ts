import React, { useCallback, useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { type NotifyOnChangeProps } from "@tanstack/query-core";
import { focusManager, type UseQueryResult } from "@tanstack/react-query";

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export const useAppState = () => {
  useEffect(() => {
    const sub = AppState.addEventListener("change", onAppStateChange);

    return () => {
      sub.remove();
    };
  }, []);
};

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
};

export const useFocusNotifyOnChangeProps = (
  notifyOnChangeProps?: NotifyOnChangeProps,
) => {
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, []),
  );

  return () => {
    if (!focusedRef.current) {
      return [];
    }

    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFunction<T = any> = () => Promise<T>;

type UseRefreshingReturn = [boolean, AsyncFunction];

type QueryResultOrRefreshFn = AsyncFunction | UseQueryResult;

export const useRefreshing = (
  ...sources: QueryResultOrRefreshFn[]
): UseRefreshingReturn => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await Promise.all(
        sources.map((source) => {
          if (typeof source === "function") {
            return source();
          } else {
            return source.refetch();
          }
        }),
      );
    } finally {
      setIsRefreshing(false);
    }
  }, [sources]);

  return [isRefreshing, refresh];
};
