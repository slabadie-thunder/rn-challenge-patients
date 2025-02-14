import { type FC } from "react";
import {
  Image as ImageNative,
  type ImageProps as ImageNativeProps,
} from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const imageVariants = tv({
  base: "max-h-full max-w-full",
  variants: {
    avatar: {
      true: "h-14 w-14 rounded-full",
    },
  },
});

type ImageVariants = VariantProps<typeof imageVariants>;

type ImageProps = {
  width?: number;
  height?: number;
} & ImageNativeProps &
  ImageVariants;

export const Image: FC<ImageProps> = ({ avatar, ...props }) => {
  return <ImageNative className={imageVariants({ avatar })} {...props} />;
};
