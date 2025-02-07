import { Redirect, Stack } from "expo-router";

import { useAuthStore } from "@/stores";

export default function AppLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Redirect href="/(public)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="toasts/index"
        options={{
          headerShown: true,
          headerTitle: "Toasts",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="inputs/index"
        options={{
          headerShown: true,
          headerTitle: "Inputs",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="buttons/index"
        options={{
          headerShown: true,
          headerTitle: "Buttons",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
