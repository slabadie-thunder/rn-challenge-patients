import { useMutation } from "@tanstack/react-query";

import { login } from "@/api";
import { useAuthStore, useUserStore } from "@/stores";

export const useLoginMutation = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.token);
    },
  });
};
