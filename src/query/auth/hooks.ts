import { useMutation } from "@tanstack/react-query";

import { login } from "@/api";
import { useUserStore } from "@/stores";

export const useLoginMutation = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
