import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPatient, deletePatient, editPatient } from "@/api";
import { patientQueries } from "./queries";

export const useGetPatients = (params?: { search?: string }) =>
  useQuery({
    ...patientQueries.all(params),
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
      queryClient.invalidateQueries({ queryKey: patientQueries.all._def });
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

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPatient,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Patient updated",
      });
      queryClient.invalidateQueries({ queryKey: patientQueries.all._def });
    },
    meta: {
      errorMessage: "Error updating patient",
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Patient deleted",
      });
      console.log("invalidating");
      console.log(patientQueries.all._def);
      queryClient.invalidateQueries({ queryKey: patientQueries.all._def });
    },
    meta: {
      errorMessage: "Error deleting patient",
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });
};
