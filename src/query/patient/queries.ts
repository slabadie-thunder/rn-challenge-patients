import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getPatient, getPatients } from "@/api";

export const patientQueries = createQueryKeys("patients", {
  all: (params?: { search?: string }) => ({
    queryKey: [{ search: params?.search }, params],
    queryFn: () => getPatients(params?.search),
  }),
  detail: (pateitnId: string) => ({
    queryKey: [pateitnId],
    queryFn: () => getPatient(pateitnId),
  }),
});
