import { useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import { BottomSheetView, type BottomSheetModal } from "@gorhom/bottom-sheet";

import { Button, Container, Typography } from "@/components";
import { Column } from "@/components/flex";
import {
  BottomSheetContainer,
  SnapPointsBottomSheetModal,
} from "@/components/modals";

export default function Tabs() {
  const router = useRouter();
  const ref = useRef<BottomSheetModal>(null);

  const handleOpenModal = useCallback(() => {
    ref.current?.present();
  }, []);

  return (
    <Container className="flex-1">
      <Column className="py-safe justify-between" expanded gap="lg">
        <Column className="gap-5"></Column>

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
