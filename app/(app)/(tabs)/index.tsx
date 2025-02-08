import { useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import { BottomSheetView, type BottomSheetModal } from "@gorhom/bottom-sheet";

import { Button, Container, Divider, Typography } from "@/components";
import { Column } from "@/components/flex";
import {
  BottomSheetContainer,
  SnapPointsBottomSheetModal,
} from "@/components/modals";
import { useGetPatients } from "@/query/patient";
import { PatientCard } from "@/components/patients";
import { FlatList } from "react-native";

const ItemSeparator = () => <Divider className="my-2" />;

export default function Tabs() {
  const router = useRouter();
  const ref = useRef<BottomSheetModal>(null);

  const { data, isLoading, isError } = useGetPatients();

  const handleOpenModal = useCallback(() => {
    ref.current?.present();
  }, []);

  return (
    <Container className="flex-1">
      <Column className="py-safe justify-between" expanded gap="lg">
        <Column className="gap-5">
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>Error</Typography>}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PatientCard key={item.id} patient={item} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            ItemSeparatorComponent={ItemSeparator}
          />
        </Column>

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
