import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { TextInput, type TextInputProps } from "../TextInput";

export type TextInputFieldProps<T extends FieldValues> = {
  input?: TextInputProps;
} & UseControllerProps<T>;

export const NumberInputField = <K extends FieldValues>({
  control,
  name,
  input,
}: TextInputFieldProps<K>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="numbers-and-punctuation"
        error={error?.message}
        {...input}
      />
    )}
  />
);
