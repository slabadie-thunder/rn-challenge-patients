import { FlashList } from "@shopify/flash-list";

import { Container, Divider, PatientCard } from "@/components";
import { usePatientOperations } from "@/hooks";
import { usePatientStore } from "@/stores";

const ItemSeparator = () => <Divider className="my-2 h-0.5" />;

export default function Favorites() {
  const { favoritePatients } = usePatientStore();
  const { handleEditPatient, handleDeletePatient, handleFavoritePatient } =
    usePatientOperations();

  return (
    <Container className="h-full w-full flex-1 gap-5 py-4">
      <FlashList
        data={favoritePatients}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
            onFavoritePatient={handleFavoritePatient}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-5"
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
