import { type FC, type PropsWithChildren } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { tw } from "@/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const BottomSheetContainer: FC<Props> = ({ className, children }) => (
  <BottomSheetView className={tw("px-street", className)}>
    {children}
  </BottomSheetView>
);
