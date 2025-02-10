import { View, type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const dividerVariants = tv({
  variants: {
    variant: {
      default: "h-0.5 bg-neutral-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type DividerVariants = VariantProps<typeof dividerVariants>;

export const Divider = ({
  className,
  variant,
  ...rest
}: Omit<ViewProps, "children"> & DividerVariants) => (
  <View className={dividerVariants({ variant, className })} {...rest}></View>
);
