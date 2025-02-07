import { useRouter } from "expo-router";

import { Button, Container, Typography } from "@/components";

export default function Favorites() {
  const router = useRouter();
  return (
    <Container
      expanded
      className="pt-safe flex-1 items-center justify-center gap-5"
    >
      <Typography>Favorites</Typography>
    </Container>
  );
}
