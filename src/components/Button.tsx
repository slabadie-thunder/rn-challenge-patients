import { useMemo, type FC } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { Row } from "./flex";
import { Icon, type IconName } from "./Icon";
import { Typography, type TextProps, type TextVariants } from "./Typography";

const buttonVariants = tv({
  base: "justify-center rounded-md px-4 py-2",
  variants: {
    variant: {
      solid: "bg-primary-500 text-gray-100",
      outline: "border border-red-500 bg-transparent",
      ghost: "bg-transparent",
    },
    busy: {
      true: "opacity-50",
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    disabled: false,
    variant: "solid",
    rounded: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  title?: string;
  busy?: boolean;
  icon?: IconName;
  iconOnLeft?: boolean;
  textStyle?: TextProps;
  textClasses?: string;
} & ButtonVariants &
  TouchableOpacityProps;

export const Button: FC<ButtonProps> = ({
  variant,
  disabled,
  textStyle,
  title,
  className,
  busy,
  icon,
  rounded,
  iconOnLeft = false,
  textClasses,
  children,
  ...props
}) => {
  const textType = useMemo<TextVariants>(
    () => ({
      color: busy ? "primary" : variant === "solid" ? "tertiary" : "primary",
    }),
    [variant, busy],
  );

  const iconComponent = useMemo(() => {
    if (icon) return <Icon name={icon} />;
  }, [icon]);

  return (
    <TouchableOpacity
      accessibilityState={{ busy }}
      accessibilityRole="button"
      disabled={disabled || busy}
      className={buttonVariants({ variant, busy, rounded, className })}
      {...props}
    >
      <Row center={!icon} className="items-center">
        {iconOnLeft && iconComponent}
        {title && (
          <Typography {...textType} {...textStyle} className={textClasses}>
            {title}
          </Typography>
        )}
        {children}
        {!iconOnLeft && iconComponent}
        {busy && <ActivityIndicator />}
      </Row>
    </TouchableOpacity>
  );
};
