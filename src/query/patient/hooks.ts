import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPatient, editPatient } from "@/api";
import { patientQueries } from "./queries";

export const useGetPatients = () =>
  useQuery({
    ...patientQueries.all,
  });

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Patient created",
      });
      queryClient.invalidateQueries(patientQueries.all);
    },
    meta: {
      errorMessage: "Error creating patient",
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });
};
