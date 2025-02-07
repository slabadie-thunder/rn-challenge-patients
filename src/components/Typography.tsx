import { forwardRef } from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "font-semibold",
  variants: {
    size: {
      title: "text-2xl",
      subtitle: "text-xl",
      body: "text-base",
      caption: "text-sm",
    },
    color: {
      primary: "text-neutral-900",
      secondary: "text-green-500",
      tertiary: "text-blue-500",
      quaternary: "text-yellow-500",
      quinary: "text-purple-500",
    },
    font: {
      regular: "font-inter-regular",
      medium: "font-inter-medium",
      semibold: "font-inter-semibold",
      bold: "font-inter-bold",
    },
    alignment: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
    },
    textTransform: {
      capitalize: "capitalize",
      lowercase: "lowercase",
      uppercase: "uppercase",
    },
  },
  defaultVariants: {
    alignment: "center",
    font: "regular",
    size: "body",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;

export type TextProps = RNTextProps & TextVariants;
export const Typography = forwardRef<RNText, TextProps>(
  (
    { size, color, font, alignment, textTransform, className, ...props },
    ref,
  ) => (
    <RNText
      allowFontScaling={false}
      ref={ref}
      className={textVariants({
        size,
        color,
        font,
        alignment,
        textTransform,
        className,
      })}
      {...props}
    />
  ),
);
