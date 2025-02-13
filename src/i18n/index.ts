import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import "intl-pluralrules";

import { en } from "./locales";

const resources = {
  en: { translation: en },
};

void i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
