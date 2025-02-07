import { useRouter } from "expo-router";

import { Button, Container } from "@/components";

export default function Components() {
  const router = useRouter();
  return (
    <Container
      expanded
      className="pt-safe flex-1 items-center justify-center gap-5"
    >
      <Button
        className="w-1/2 items-center"
        onPress={() => router.push("/buttons")}
        title="Buttons"
        rounded="full"
      />
      <Button
        className="w-1/2 items-center"
        onPress={() => router.push("/inputs")}
        title="Inputs"
        rounded="full"
      />
      <Button
        className="w-1/2 items-center"
        onPress={() => router.push("/toasts")}
        title="Toasts"
        rounded="full"
      />
    </Container>
  );
}
