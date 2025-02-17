import React, { useEffect } from "react";
import { Tabs } from "expo-router";

import { Button, Icon, PatientModal } from "@/components";
import { usePatientStore } from "@/stores";
import { colors } from "@/utils";

export default function Layout() {
  const { isPatientModalOpen, setIsPatientModalOpen, setPatient } =
    usePatientStore();
  useEffect(() => {
    return () => {
      setIsPatientModalOpen(false);
    };
  }, [setIsPatientModalOpen]);

  const onCreatePatient = () => {
    setPatient(null);
    setIsPatientModalOpen(true);
  };

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.secondary[700],
          tabBarInactiveTintColor: colors.black.DEFAULT,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Patients",
            tabBarIcon: () => <Icon name="home" />,
            headerShown: true,
            headerRight: () => (
              <Button variant="ghost" icon="plus" onPress={onCreatePatient} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: () => <Icon name="heart" />,
            headerShown: true,
          }}
        />
      </Tabs>
      {isPatientModalOpen && <PatientModal />}
    </>
  );
}
