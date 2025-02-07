import { type FC } from "react";
import { type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { Flex, type FlexVariants } from "./Flex";

const rowVariants = tv({
  base: "flex-row",
  variants: {
    gap: {
      none: "",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    gap: "none",
  },
});

type RowVariants = VariantProps<typeof rowVariants>;

type RowProps = ViewProps & RowVariants & FlexVariants;

export const Row: FC<RowProps> = ({ className, gap, ...props }) => (
  <Flex
    direction="row"
    className={rowVariants({ gap, className })}
    {...props}
  />
);
