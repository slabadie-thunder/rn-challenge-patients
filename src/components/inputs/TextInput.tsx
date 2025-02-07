import { forwardRef, useCallback, useRef, useState } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { Row } from "../flex";
import { Icon, type IconProps } from "../Icon";
import { Typography, type TextProps } from "../Typography";

const inputVariants = tv({
  slots: {
    container: "rounded-lg bg-white",
    input: "grow bg-gray-300 p-3 lowercase",
  },
  variants: {
    isFocused: {
      true: {
        container: "rounded-lg border-2 border-red-700",
      },
    },
  },
});

export type TextInputProps = {
  label?: string;
  requiredField?: boolean;
  containerClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  labelStyle?: TextProps;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  onPressRightIcon?: () => void;
  error?: string;
  errorStyle?: TextProps;
} & RNTextInputProps;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      onFocus,
      onBlur,
      label,
      labelStyle,
      containerClassName,
      leftIcon,
      rightIcon,
      requiredField,
      error,
      errorStyle,
      onPressRightIcon,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<RNTextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => {
      onFocus?.();
      setIsFocused(true);
      inputRef?.current?.focus();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      onBlur?.();
      setIsFocused(false);
      inputRef?.current?.blur();
    }, [onBlur]);

    return (
      <View className={containerClassName}>
        {label && (
          <Row gap="sm" center>
            <Typography {...labelStyle}>{label}</Typography>
            {requiredField && (
              <Typography color={labelStyle?.color}>*</Typography>
            )}
          </Row>
        )}

        <Row
          expanded
          center
          gap="sm"
          className={inputVariants({
            isFocused,
          }).container({
            className: "p-0",
          })}
        >
          {leftIcon && (
            <View className="pl-3">
              <Icon {...leftIcon} />
            </View>
          )}

          <RNTextInput
            ref={ref}
            allowFontScaling={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={twMerge(inputVariants().input(), "flex-1 rounded-lg")}
            autoComplete="off"
            autoCapitalize="none"
            {...props}
          />
          {rightIcon && (
            <Pressable className="pr-2" onPress={onPressRightIcon}>
              <Icon {...rightIcon} />
            </Pressable>
          )}
        </Row>

        {error && (
          <Typography
            className="pt-2 text-error-500"
            alignment="left"
            {...errorStyle}
          >
            {error}
          </Typography>
        )}
      </View>
    );
  },
);
