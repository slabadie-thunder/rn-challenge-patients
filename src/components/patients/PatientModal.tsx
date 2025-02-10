import { useEffect, useRef } from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { patientSchema, type PatientForm } from "@/schemas";
import { usePatientStore } from "@/stores";
import { Row } from "../flex";
import { TextInputField } from "../inputs";
import { BottomSheetContainer, SnapPointsBottomSheetModal } from "../modals";

const PatientModal = () => {
  const ref = useRef<BottomSheetModal>(null);
  const { patient, setIsPatientModalOpen } = usePatientStore();
  const { control, handleSubmit } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
    mode: "onTouched",
    defaultValues: {
      name: patient?.name ?? "",
      avatar: patient?.avatar ?? "",
      description: patient?.description ?? "",
      website: patient?.website ?? "",
      id: patient?.id ?? "",
    },
  });

  const onSubmit = (data: PatientForm) => {
    console.log(data);
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
      snapPoints={["50%", "75%"]}
      onDismiss={closeModal}
    >
      <BottomSheetContainer>
        <BottomSheetView className="pb-safe">
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
            name="avatar"
            input={{ label: "Avatar" }}
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

          <Row>
            <Button title="Close" onPress={closeModal} />
            <Button title="Save" onPress={handleSubmit(onSubmit)} />
          </Row>
        </BottomSheetView>
      </BottomSheetContainer>
    </SnapPointsBottomSheetModal>
  );
};

export { PatientModal };
