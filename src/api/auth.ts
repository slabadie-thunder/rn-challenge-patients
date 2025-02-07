import { queryClient } from "@/query";
import { useUserStore, type User } from "@/stores";
import { asyncTimeout } from "@/utils";

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  await asyncTimeout(1000);
  return {
    token: "string",
    user: {
      id: 1,
      name: "Test User",
      email: params.email,
    },
  };
};

export const logout = () => {
  useUserStore.getState().reset();
  queryClient.clear();
};
