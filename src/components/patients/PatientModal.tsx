import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DEFAULT_AVATAR } from "@/constants/constants";
import { useCreatePatient, useUpdatePatient } from "@/query/patient";
import { patientSchema, type PatientForm } from "@/schemas";
import { usePatientStore } from "@/stores";
import { Button } from "../Button";
import { Column, Row } from "../flex";
import { Image } from "../Image";
import { TextInputField } from "../inputs";
import { BottomSheetContainer, SnapPointsBottomSheetModal } from "../modals";

const PatientModal = () => {
  const ref = useRef<BottomSheetModal>(null);
  const { patient, setIsPatientModalOpen } = usePatientStore();
  const [error, setError] = useState(false);
  const { mutate: createPatient } = useCreatePatient();
  const { mutate: editPatient } = useUpdatePatient();
  const { control, handleSubmit } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
    mode: "onTouched",
    defaultValues: {
      name: patient?.name ?? "",
      avatar: patient?.avatar ?? "",
      description: patient?.description ?? "",
      website: patient?.website ?? "",
      id: patient?.id ?? "0",
    },
  });

  const onSubmit = (data: PatientForm) => {
    if (patient) {
      editPatient(data, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      createPatient(data, {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    ref.current?.present();
  }, []);

  const closeModal = () => {
    setIsPatientModalOpen(false);
    ref.current?.dismiss();
  };

  return (
    <SnapPointsBottomSheetModal
      ref={ref}
      snapPoints={["60%", "50%"]}
      onDismiss={closeModal}
    >
      <BottomSheetContainer>
        <BottomSheetView className="pb-safe">
          <Column gap="md">
            <Row justify="center">
              <Image
                source={{
                  uri:
                    error || !patient?.avatar
                      ? DEFAULT_AVATAR
                      : patient?.avatar,
                }}
                onError={() => {
                  setError(true);
                }}
                className="h-20 w-20 rounded-full"
                avatar
              />
            </Row>
            <TextInputField
              control={control}
              name="id"
              input={{ label: "Id", editable: false }}
            />
            <TextInputField
              control={control}
              name="name"
              input={{ label: "Name" }}
            />
            <TextInputField
              control={control}
              name="description"
              input={{ label: "Description" }}
            />
            <TextInputField
              control={control}
              name="website"
              input={{ label: "Website" }}
            />

            <Row gap="md" justify="center">
              <Button variant="solid" title="Close" onPress={closeModal} />
              <Button
                variant="solid"
                title="Save"
                onPress={handleSubmit(onSubmit)}
              />
            </Row>
          </Column>
        </BottomSheetView>
      </BottomSheetContainer>
    </SnapPointsBottomSheetModal>
  );
};

export { PatientModal };
