import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { tw } from "@/utils";

export type BoxProps = {
  children: ReactNode;
  classes?: string;
} & ViewProps;

export const Label = ({ children, classes }: BoxProps) => (
  <View className={tw("flex pb-1", classes)}>{children}</View>
);
