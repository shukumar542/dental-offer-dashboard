"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/verify-otp");
      }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-[32px] font-bold text-ink">{t("auth.forgotTitle")}</h1>
        <p className="mt-1 text-muted">{t("auth.forgotSub")}</p>
      </div>
      <Field label={t("auth.email")}>
        <input type="email" required className="input" placeholder={t("auth.emailPh")} />
      </Field>
      <button className="btn w-full">{t("auth.sendCode")}</button>
      <Link href="/login" className="block text-center text-[15px] font-semibold">
        {t("auth.backToLogin")}
      </Link>
    </form>
  );
}
