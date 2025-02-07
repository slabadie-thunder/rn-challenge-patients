import { forwardRef, type PropsWithChildren } from "react";
import {
  BottomSheetModal,
  type BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";

import { ModalBackdrop, type ModalBackdropProps } from "./ModalBackdrop";

export type DynamicBottomSheetModalProps = PropsWithChildren &
  Omit<
    BottomSheetModalProps,
    "backdropComponent" | "ref" | "index" | "handleComponent"
  > &
  Pick<ModalBackdropProps, "dismiss">;

const RemappedBottomSheet = cssInterop(BottomSheetModal, {
  backgroundClassName: "backgroundStyle",
});

export const DynamicBottomSheetModal = forwardRef<
  BottomSheetModal,
  DynamicBottomSheetModalProps
>(({ children, dismiss, ...props }, ref) => (
  <RemappedBottomSheet
    ref={ref}
    // by default, the bottom sheet will be dynamic
    index={0}
    enablePanDownToClose
    // handleComponent={() => (
    //   <ModalHeader
    //     title={title}
    //     titleCenter={titleCenter}
    //     canGoBack={canGoBack}
    //   />
    // )}
    enableDismissOnClose
    backgroundClassName="rounded-t-3xl"
    backdropComponent={(backdropProps) => (
      <ModalBackdrop dismiss={dismiss} {...backdropProps} />
    )}
    {...props}
  >
    {children}
  </RemappedBottomSheet>
));
