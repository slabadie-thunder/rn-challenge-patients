import { api } from "./api";
import { type ServiceResponse } from "./api.types";

export type Patient = {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
};

export type AddPatientParams = Omit<Patient, "id" | "createdAt" | "avatar">;
export type EditPatientParams = Omit<Patient, "createdAt">;

export const getPatients = async (search?: string): Promise<Patient[]> => {
  const { data } = await api.get<Patient[]>("/users", {
    params: search ? { name: search } : undefined,
  });
  return data;
};

export const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await api.get<ServiceResponse<Patient>>(`/users/${id}`);
  return data.data;
};

export const createPatient = async (patient: AddPatientParams) => {
  const { data } = await api.post<Patient>(`/users`, patient);
  return data;
};

export const editPatient = async (patient: EditPatientParams) => {
  const { data } = await api.put<Patient>(`/users/${patient.id}`, patient);
  return data;
};

export const deletePatient = async (id: string) => {
  const { data } = await api.delete<Patient>(`/users/${id}`);
  return data;
};
