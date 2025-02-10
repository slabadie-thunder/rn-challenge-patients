import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { type Patient } from "@/api";
import { LightItLogo, Target } from "@/assets";
import {
  Container,
  Divider,
  EmptyState,
  TextInput,
  Typography,
} from "@/components";
import { Column } from "@/components/flex";
import { PatientCard } from "@/components/patients";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetPatients } from "@/query/patient";
import { usePatientStore } from "@/stores";

const ItemSeparator = () => <Divider className="my-2" />;

export default function Tabs() {
  const { data, isLoading, isError } = useGetPatients();
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>();
  const { setPatient, setIsPatientModalOpen } = usePatientStore();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleEditPatient = (patient: Patient) => {
    setPatient(patient);
    setIsPatientModalOpen(true);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setFilteredPatients(
        data?.filter((patient) =>
          patient.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        ),
      );
    } else {
      setFilteredPatients(data);
    }
  }, [data, debouncedSearch]);

  return (
    <Container className="flex-1">
      <Column gap="lg" className="py-4">
        <TextInput
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
        />
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error</Typography>}
        {filteredPatients?.length === 0 && (
          <EmptyState icon={<LightItLogo />} subtitle="No patients found" />
        )}

        <FlatList
          data={filteredPatients}
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
          showsVerticalScrollIndicator={false}
        />
      </Column>
    </Container>
  );
}
