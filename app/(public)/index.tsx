import { useState } from "react";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LightItLogo } from "@/assets";
import { Button, Column, Container, TextInputField } from "@/components";
import { useLoginMutation } from "@/query/auth";
import { loginSchema, type LoginForm } from "@/schemas";

export default function Public() {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);

  const { mutate, isPending } = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "lightit@testing.com",
      password: "12345",
    },
  });

  const handleSignUp = () => router.push("/sign-up");

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/(app)/(tabs)");
      },
    });
  });

  return (
    <Container className="py-safe mt-10 flex flex-1 px-10">
      <Column className="items-center">
        <LightItLogo className="self-center" />
      </Column>

      <Column className="flex-1 justify-between">
        <Column gap="lg" className="mt-10">
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
            }}
          />

          <TextInputField
            control={control}
            name="password"
            input={{
              secureTextEntry: hidePassword,
              requiredField: true,
              label: "Password",
              placeholder: "*******",
              leftIcon: {
                name: "user",
                color: "primary",
                size: "md",
              },
              rightIcon: {
                name: hidePassword ? "eye" : "eyeo",
                color: "primary",
                size: "md",
              },
              onPressRightIcon: () => setHidePassword((prev) => !prev),
            }}
          />
        </Column>
        <Column className="items-center gap-4">
          <Button
            iconOnLeft
            icon="login"
            title="Login"
            onPress={onSubmit}
            textStyle={{ color: "primary" }}
            className="w-full items-center"
            busy={isPending}
          />

          <Button
            iconOnLeft
            icon="user"
            title="Sign Up"
            onPress={handleSignUp}
            variant="outline"
            className="w-full items-center"
            disabled={isPending}
          />
        </Column>
      </Column>
    </Container>
  );
}
