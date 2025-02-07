import { View } from "react-native";
import Toast from "react-native-toast-message";

import { Button } from "@/components";

export default function Toasts() {
  return (
    <View className="pt-safe flex-1 items-center justify-evenly">
      <Button
        title="Success Toast"
        variant="outline"
        onPress={() =>
          Toast.show({
            type: "success",
            text1: "Success!",
            position: "bottom",
          })
        }
      />

      <Button
        title="Warning Toast"
        variant="outline"
        onPress={() =>
          Toast.show({
            type: "warning",
            text1: "Take a look!",
            position: "bottom",
          })
        }
      />

      <Button
        title="Error Toast"
        variant="outline"
        onPress={() =>
          Toast.show({
            type: "error",
            text1: "Something goes wrong!",
            position: "bottom",
          })
        }
      />
    </View>
  );
}
