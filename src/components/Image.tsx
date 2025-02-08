import { FC } from "react";
import {
  Image as ImageNative,
  ImageProps as ImageNativeProps,
} from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const imageVariants = tv({
  base: "max-w-full max-h-full",
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
