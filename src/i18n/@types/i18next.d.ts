import type resources from "./resources";

declare module "i18next" {
  type CustomTypeOptions = {
    defaultNS: "en";
    resources: typeof resources;
  };
}
