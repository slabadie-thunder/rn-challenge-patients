import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getPatient, getPatients } from "@/api";

export const patientQueries = createQueryKeys("patients", {
  all: {
    queryKey: null,
    queryFn: () => getPatients(),
  },
  detail: (pateitnId: string) => ({
    queryKey: [pateitnId],
    queryFn: () => getPatient(pateitnId),
  }),
});
