import { type FC } from "react";
import { type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { Flex, type FlexVariants } from "./Flex";

const columnVariants = tv({
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

type ColumnVariants = VariantProps<typeof columnVariants>;

type ColumnProps = ViewProps & ColumnVariants & FlexVariants;

export const Column: FC<ColumnProps> = ({ className, gap, ...props }) => (
  <Flex
    direction="column"
    className={columnVariants({ gap, className })}
    {...props}
  />
);
