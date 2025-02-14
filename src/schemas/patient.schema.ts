import { z } from "zod";

import i18n from "@/i18n";

const validateUrlProtocol = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const patientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: i18n.t("form.patient_name_required") }),
  avatar: z
    .string()
    .min(1, { message: i18n.t("form.patient_avatar_required") }),
  description: z
    .string()
    .min(1, { message: i18n.t("form.patient_description_required") }),
  website: z
    .string()
    .min(1, { message: i18n.t("form.patient_website_required") })
    .refine(validateUrlProtocol, { message: i18n.t("form.url_format_message") })
    .refine(validateUrl, { message: i18n.t("form.valid_url_message") }),
});

export type PatientForm = z.infer<typeof patientSchema>;
