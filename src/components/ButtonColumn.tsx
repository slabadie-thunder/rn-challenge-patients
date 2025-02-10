import { useMemo, type FC } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { Column } from "./flex";
import { Icon, type IconName } from "./Icon";
import { Typography, type TextProps, type TextVariants } from "./Typography";

const buttonColumnVariants = tv({
  base: "justify-center rounded-md px-4 py-2",
  variants: {
    variant: {
      solid: "bg-primary-500 text-gray-100",
      outline: "border border-red-500 bg-transparent",
      ghost: "bg-transparent",
      danger: "bg-red-500 text-white",
      favorite: "bg-orange-500 text-white",
    },
    busy: {
      true: "opacity-50",
    },
    rounded: {
      none: "rounded-none",
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

type ButtonColumnVariants = VariantProps<typeof buttonColumnVariants>;

type ButtonColumnProps = {
  title?: string;
  busy?: boolean;
  icon?: IconName;
  iconColor?: string;
  iconOnLeft?: boolean;
  textStyle?: TextProps;
  textClasses?: string;
} & ButtonColumnVariants &
  TouchableOpacityProps;

export const ButtonColumn: FC<ButtonColumnProps> = ({
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
  iconColor,
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
    if (icon) return <Icon name={icon} color={iconColor} />;
  }, [icon, iconColor]);

  return (
    <TouchableOpacity
      accessibilityState={{ busy }}
      accessibilityRole="button"
      disabled={disabled || busy}
      className={buttonColumnVariants({ variant, busy, rounded, className })}
      {...props}
    >
      <Column center={!icon} className="items-center">
        {iconOnLeft && iconComponent}
        {title && (
          <Typography {...textType} {...textStyle} className={textClasses}>
            {title}
          </Typography>
        )}
        {children}
        {!iconOnLeft && iconComponent}
        {busy && <ActivityIndicator />}
      </Column>
    </TouchableOpacity>
  );
};
