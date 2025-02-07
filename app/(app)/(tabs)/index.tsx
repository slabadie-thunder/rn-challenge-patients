import { useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import { BottomSheetView, type BottomSheetModal } from "@gorhom/bottom-sheet";

import { Button, Container, Typography } from "@/components";
import { Column } from "@/components/flex";
import {
  BottomSheetContainer,
  SnapPointsBottomSheetModal,
} from "@/components/modals";
import { useAuthStore } from "@/stores";

export default function Tabs() {
  const router = useRouter();
  const ref = useRef<BottomSheetModal>(null);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleOpenModal = useCallback(() => {
    ref.current?.present();
  }, []);

  const handleLogout = () => setAccessToken(null);

  return (
    <Container className="flex-1">
      <Column className="py-safe justify-between" expanded gap="lg">
        <Column className="gap-5">
          <Button title="Open Modal" onPress={handleOpenModal} />
          <Button
            title="Go to user 1"
            onPress={() => router.navigate("/user/1")}
          />
        </Column>

        <Button
          className="self-center"
          title="Logout"
          rounded="full"
          onPress={handleLogout}
        />

        <SnapPointsBottomSheetModal ref={ref} snapPoints={["25%", "50%"]}>
          <BottomSheetContainer>
            <BottomSheetView className="pb-safe">
              <Typography>Modal</Typography>
            </BottomSheetView>
          </BottomSheetContainer>
        </SnapPointsBottomSheetModal>
      </Column>
    </Container>
  );
}
