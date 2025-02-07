import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { TextInput, type TextInputProps } from "../TextInput";

type TextInputFieldProps<T extends FieldValues> = {
  input?: TextInputProps;
} & UseControllerProps<T>;

export const CheckboxField = <K extends FieldValues>({
  control,
  name,
  input,
}: TextInputFieldProps<K>) => (
  // TODO: finish
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <TextInput
        value={value}
        onChangeText={onChange}
        error={error?.message}
        {...input}
      />
    )}
  />
);
