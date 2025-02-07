import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0, // each one must be set
      staleTime: 0,
    },
  },
});
