import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { LightItLogo } from "@/assets";
import {
  Container,
  Divider,
  EmptyState,
  TextInput,
  Typography,
} from "@/components";
import { Column } from "@/components/flex";
import { PatientCard } from "@/components/patients";
import { usePatientOperations } from "@/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetPatients } from "@/query/patient";
import { colors } from "@/utils";

const ItemSeparator = () => <Divider className="my-2" />;

export default function Tabs() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, refetch, isRefetching } = useGetPatients({
    search: debouncedSearch,
  });

  const { handleEditPatient, handleDeletePatient, handleFavoritePatient } =
    usePatientOperations();

  return (
    <Container className="flex-1">
      <Column gap="lg" className="h-full w-full py-4">
        <TextInput
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
        />
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error</Typography>}
        {data?.length === 0 && (
          <EmptyState icon={<LightItLogo />} subtitle="No patients found" />
        )}

        <FlashList
          data={data}
          renderItem={({ item }) => (
            <PatientCard
              key={item.id}
              patient={item}
              onEditPatient={handleEditPatient}
              onDeletePatient={handleDeletePatient}
              onFavoritePatient={handleFavoritePatient}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.primary[900]}
              colors={[colors.primary[900]]}
            />
          }
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-5"
          estimatedItemSize={100}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
        />
      </Column>
    </Container>
  );
}
