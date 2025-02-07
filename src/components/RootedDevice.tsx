import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import * as Device from "expo-device";

// import * as Sentry from "@sentry/react-native";

// import { MaintenanceScreen } from "~/screens/maintenance";
// import { useDeviceStore } from "~/store/device/useDeviceStore";

type Props = PropsWithChildren;

export const DeveloperMode: FC<Props> = ({ children }) => {
  const [isRooted, setIsRooted] = useState(false);

  useEffect(() => {
    async function userIsRooted() {
      try {
        const rooted = await Device.isRootedExperimentalAsync();
        setIsRooted(rooted);

        if (rooted) {
          //   Sentry.captureEvent({
          //     message: "User is rooted",
          //     level: "warning",
          //     timestamp: new Date().getTime(),
          //     user: {
          //       ip_address: deviceId,
          //     },
          //   });
        }
      } catch (e) {
        // Sentry.captureException(e);
      }
    }

    userIsRooted();
  }, []);

  if (isRooted) {
    // return <MaintenanceScreen />;
  }

  return children;
};
