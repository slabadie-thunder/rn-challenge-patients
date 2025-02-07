import { type FC } from "react";
import { type ViewProps } from "react-native";

import { tw } from "@/utils";
import { Flex, type FlexProps } from "./flex";

type ContainerProps = ViewProps & FlexProps;

export const Container: FC<ContainerProps> = ({ className, ...props }) => (
  <Flex className={tw("px-street", className)} {...props} />
);
