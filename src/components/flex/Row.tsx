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
    align: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
      between: "items-between",
    },
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    gap: "none",
  },
});

type RowVariants = VariantProps<typeof rowVariants>;

type RowProps = ViewProps & RowVariants & FlexVariants;

export const Row: FC<RowProps> = ({ className, gap, align, justify, ...props }) => (
  <Flex
    direction="row"
    className={rowVariants({ gap, className, align, justify })}
    {...props}
  />
);
