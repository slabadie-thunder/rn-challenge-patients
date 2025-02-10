import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Patient } from "@/api";
import { type Resettable, type SetEvents } from "./types";

type PatientState = {
  favoritePatients: Patient[];
  patient: Patient | null;
  isPatientModalOpen: boolean;
};

type PatientFavotitesActions = {
  addFavoritePatient: (patient: Patient) => void;
  removeFavoritePatient: (patient: Patient) => void;
};

type PatientActions = SetEvents<PatientState> &
  Resettable &
  PatientFavotitesActions;

type PatientStore = PatientState & PatientActions;

export const usePatientStore = create(
  persist<PatientStore>(
    (set) => ({
      favoritePatients: [],
      patient: null,
      isPatientModalOpen: false,
      setPatient: (patient: Patient | null) => set({ patient }),
      setIsPatientModalOpen: (isPatientModalOpen: boolean) =>
        set({ isPatientModalOpen }),
      setFavoritePatients: (favoritePatients: Patient[]) =>
        set({ favoritePatients }),
      addFavoritePatient: (patient: Patient) =>
        set((state) => ({
          favoritePatients: [...state.favoritePatients, patient],
        })),
      removeFavoritePatient: (patient: Patient) =>
        set((state) => ({
          favoritePatients: state.favoritePatients.filter(
            (p) => p.id !== patient.id,
          ),
        })),
      reset() {
        set({ favoritePatients: [], patient: null, isPatientModalOpen: false });
      },
    }),
    {
      name: "patientStore",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
