import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type Resettable, type SetEvents } from "./types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthActions = SetEvents<AuthState> & Resettable;

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken: string | null) => {
        set(() => ({ accessToken }));
      },
      setRefreshToken: (refreshToken: string | null) => {
        set(() => ({ refreshToken }));
      },
      reset: () => {
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
