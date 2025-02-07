import { Platform } from "react-native";
import * as Application from "expo-application";
import * as Device from "expo-device";
import axios, { type AxiosError } from "axios";

import { useUserStore } from "@/stores";
import { HttpHeader } from "./enums";

const baseConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Platform: Platform.OS,
  },
};

const api = axios.create(baseConfig);

api.defaults.headers.common[HttpHeader.PLATFORM] = Platform.OS;
api.defaults.headers.common[HttpHeader.APP_VERSION] =
  Application.nativeApplicationVersion;
api.defaults.headers.common[HttpHeader.MODEL] =
  `${Device.manufacturer} ${Device.modelName}`;
api.defaults.headers.common[HttpHeader.OS_VERSION] =
  `${Device.osName} ${Device.osVersion}`;

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const setUser = useUserStore.getState().setUser;
      setUser(null);
      // kill access token OR get new accessToken with refreshToken
    }

    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

export { api };
