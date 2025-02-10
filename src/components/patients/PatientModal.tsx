import { useEffect, useRef, useState } from "react";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { BottomSheetView, type BottomSheetModal } from "@gorhom/bottom-sheet";
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
  const { control, handleSubmit, setValue, getValues } = useForm<PatientForm>({
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

  const onSelectAvatar = async () => {
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult?.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("avatar", result.assets[0].uri);
    }
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
              <Button variant="ghost" onPress={onSelectAvatar}>
                <Image
                  source={{
                    uri:
                      error || !getValues("avatar")
                        ? DEFAULT_AVATAR
                        : getValues("avatar"),
                  }}
                  onError={() => {
                    setError(true);
                  }}
                  className="h-20 w-20 rounded-full"
                  avatar
                />
              </Button>
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
              input={{ label: "Description", numberOfLines: 2 }}
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
