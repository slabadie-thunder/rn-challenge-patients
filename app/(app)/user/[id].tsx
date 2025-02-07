import { Button, View } from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Container, Typography } from "@/components";

export default function User() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <Container className="flex-1 justify-center gap-4">
      <Typography className="text-2xl font-bold">User selected {id}</Typography>
      <Typography onPress={() => router.back()}>Go back Home</Typography>
      <Link href="/(app)/(tabs)">
        <Typography>Move to Home</Typography>
      </Link>
      <Link href="/(app)/(tabs)/components">
        <Typography>Move to Components</Typography>
      </Link>

      <Button title="Set id 2" onPress={() => router.setParams({ id: 2 })} />
      <Stack.Screen
        options={{
          title: `User ${id}`,
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Container>
  );
}
