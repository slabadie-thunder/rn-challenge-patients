import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  const [loaded, error] = useExpoFonts({
    // Only load the fonts that you need
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
  });

  return {
    fontsLoaded: loaded,
    fontError: error,
  };
};
