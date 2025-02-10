import { useCallback } from "react";
import Toast from "react-native-toast-message";

import { type Patient } from "@/api";
import { useDeletePatient } from "@/query/patient";
import { usePatientStore } from "@/stores";

export const usePatientOperations = () => {
  const deletePatient = useDeletePatient();

  const {
    setPatient,
    setIsPatientModalOpen,
    favoritePatients,
    addFavoritePatient,
    removeFavoritePatient,
  } = usePatientStore();

  const handleEditPatient = useCallback(
    (patient: Patient) => {
      setPatient(patient);
      setIsPatientModalOpen(true);
    },
    [setPatient, setIsPatientModalOpen],
  );

  const handleDeletePatient = useCallback(
    (patient: Patient) => {
      deletePatient.mutate(patient.id);
    },
    [deletePatient],
  );

  const handleFavoritePatient = useCallback(
    (patient: Patient) => {
      if (favoritePatients.includes(patient)) {
        Toast.show({
          type: "error",
          text1: "Patient removed from favorites",
        });
        removeFavoritePatient(patient);
      } else {
        Toast.show({
          type: "success",
          text1: "Patient added to favorites",
        });
        addFavoritePatient(patient);
      }
    },
    [favoritePatients, addFavoritePatient, removeFavoritePatient],
  );

  return {
    handleEditPatient,
    handleDeletePatient,
    handleFavoritePatient,
  };
};
