import { FlatList } from "react-native";

import { Container, Divider, PatientCard } from "@/components";
import { usePatientOperations } from "@/hooks";
import { usePatientStore } from "@/stores";


const ItemSeparator = () => <Divider className="my-2" />;

export default function Favorites() {
  const { favoritePatients } = usePatientStore();
  const { handleEditPatient, handleDeletePatient, handleFavoritePatient } =
    usePatientOperations();

  return (
    <Container
      expanded
      className="flex-1 items-center justify-center gap-5 py-4"
    >
      <FlatList
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
        contentContainerStyle={{ gap: 10 }}
      />
    </Container>
  );
}
