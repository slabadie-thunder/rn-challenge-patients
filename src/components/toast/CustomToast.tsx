import { View } from "react-native";
import Toast, { type BaseToastProps } from "react-native-toast-message";

import { colors, tw } from "@/utils";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

//TODO: change to use tailwind variants
type CustomToastProps = {
  warning?: boolean;
  error?: boolean;
  success?: boolean;
} & BaseToastProps;

export const CustomToast = ({
  warning,
  error,
  success,
  ...props
}: CustomToastProps) => {
  return (
    <View
      className={tw(
        "w-80 flex-row items-center justify-between px-4 pb-4 pt-5",
        success && "bg-success-900",
        warning && "bg-warning-500",
        error && "bg-error-900",
      )}
    >
      <View className="flex-row items-center">
        {success && <Typography className="text-white">{":)"}</Typography>}
        {warning && <Typography className="text-white">{":|"}</Typography>}
        {error && <Typography className="text-white">{":("}</Typography>}
        <Typography className="ml-4 max-w-[95%] text-base text-white">
          {props.text1}
        </Typography>
      </View>

      <Button
        textClasses="text-black"
        variant="ghost"
        onPress={() => Toast.hide()}
      >
        <Icon name="close" color={colors.white.DEFAULT} />
      </Button>
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <CustomToast success {...props} />,

  error: (props: BaseToastProps) => <CustomToast error {...props} />,

  warning: (props: BaseToastProps) => <CustomToast warning {...props} />,
};
