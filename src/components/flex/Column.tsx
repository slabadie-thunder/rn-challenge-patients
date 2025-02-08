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
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    gap: "none",
  },
});

type ColumnVariants = VariantProps<typeof columnVariants>;

type ColumnProps = ViewProps & ColumnVariants & FlexVariants;

export const Column: FC<ColumnProps> = ({ className, gap, align, ...props }) => (
  <Flex
    direction="column"
    className={columnVariants({ gap, align, className })}
    {...props}
  />
);
