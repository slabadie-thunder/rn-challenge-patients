import { type FC } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { tv, type VariantProps } from "tailwind-variants";

import { colors } from "@/utils";

export type IconName = keyof typeof AntDesign.glyphMap;

const iconVariants = tv({
  variants: {
    size: {
      sm: "icon-sm",
      md: "icon-md",
      lg: "icon-lg",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export type IconProps = {
  name: IconName;
  className?: string;
  color?: string;
} & VariantProps<typeof iconVariants>;

export const Icon: FC<IconProps> = ({
  name,
  size,
  className,
  color = colors.black.DEFAULT,
  ...props
}) => (
  <AntDesign
    name={name}
    size={size === "lg" ? 24 : 16}
    color={color}
    className={iconVariants({ size, className })}
    {...props}
  />
);
