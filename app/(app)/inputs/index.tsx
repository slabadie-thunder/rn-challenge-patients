import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TextInputField } from "@/components";
import { loginSchema, type LoginForm } from "@/schemas";

export default function Inputs() {
  const [hidde, setHidde] = useState(false);
  const { control } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });
  return (
    <View className="pt-safe flex-1 gap-10 px-10">
      <TextInputField
        control={control}
        name="email"
        input={{ label: "Email", placeholder: "wwww.example.com" }}
      />
      <TextInputField
        control={control}
        name="email"
        input={{
          label: "Email",
          placeholder: "wwww.example.com",
          leftIcon: {
            name: "user",
            color: "primary",
            size: "md",
          },
          error: "Email is required",
        }}
      />

      <TextInputField
        control={control}
        name="password"
        input={{
          keyboardType: "number-pad",
          secureTextEntry: hidde,
          requiredField: true,
          label: "Password",
          placeholder: "*******",
          leftIcon: {
            name: "user",
            color: "primary",
            size: "md",
          },
          rightIcon: {
            name: hidde ? "eye" : "eyeo",
            color: "primary",
            size: "md",
          },
          onPressRightIcon: () => setHidde((prev) => !prev),
        }}
      />
    </View>
  );
}
