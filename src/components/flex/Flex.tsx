import { type FC } from "react";
import { View, type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const flexVariants = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    expanded: {
      true: "grow",
    },
    center: {
      true: "items-center",
    },
  },
  defaultVariants: {
    direction: "column",
    center: false,
    expanded: false,
  },
});

export type FlexVariants = VariantProps<typeof flexVariants>;

export type FlexProps = ViewProps & FlexVariants;

export const Flex: FC<FlexProps> = ({
  direction,
  expanded,
  className,
  center,
  ...props
}) => (
  <View
    className={flexVariants({ direction, expanded, center, className })}
    {...props}
  />
);
