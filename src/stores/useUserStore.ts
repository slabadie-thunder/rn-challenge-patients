import { create } from "zustand";

import { type Resettable, type SetEvents } from "./types";

export type User = {
  id: number;
  email: string;
  name: string;
};

export type UserState = {
  user: User | null;
};

export type UserActions = SetEvents<UserState> & Resettable;

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  reset() {
    set({ user: null });
  },
}));
