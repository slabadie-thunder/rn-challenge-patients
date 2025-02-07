import { z } from "zod";

import i18n from "@/i18n";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t("form.email_required") })
    .email({ message: i18n.t("form.email_not_valid") }),
  password: z.string().min(1, { message: i18n.t("form.password_required") }),
});

export type LoginForm = z.infer<typeof loginSchema>;
