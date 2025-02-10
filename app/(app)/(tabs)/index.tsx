import { FlatList } from "react-native";

import { type Patient } from "@/api";
import { Container, Divider, Typography } from "@/components";
import { Column } from "@/components/flex";
import { PatientCard } from "@/components/patients";
import { useGetPatients } from "@/query/patient";
import { usePatientStore } from "@/stores";

const ItemSeparator = () => <Divider className="my-2" />;

export default function Tabs() {
  const { data, isLoading, isError } = useGetPatients();
  const { setPatient, setIsPatientModalOpen } = usePatientStore();

  const handleEditPatient = (patient: Patient) => {
    setPatient(patient);
    setIsPatientModalOpen(true);
  };

  return (
    <Container className="flex-1">
      <Column className="py-safe justify-between" expanded gap="lg">
        <Column className="gap-5">
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>Error</Typography>}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PatientCard
                key={item.id}
                patient={item}
                onEditPatient={handleEditPatient}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            ItemSeparatorComponent={ItemSeparator}
          />
        </Column>
      </Column>
    </Container>
  );
}
