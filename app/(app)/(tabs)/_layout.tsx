import { Tabs } from "expo-router";

import { Icon } from "@/components";
import { colors } from "@/utils";

export default function Layout() {
  return (
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
          title: "Home",
          tabBarIcon: () => <Icon name="home" />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: "Components",
          tabBarIcon: () => <Icon name="QQ" />,
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
