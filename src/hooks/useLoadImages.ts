import { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";

export const useLoadImages = (urls: string[]) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadImages = useCallback(async () => {
    try {
      await Promise.all(urls.map((url) => Image.prefetch(url)));
      setIsLoaded(true);
    } catch (error) {
      console.log("Error loading image", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    loadImages();
  }, [urls, loadImages]);

  return { isLoaded, isError, isLoading };
};
