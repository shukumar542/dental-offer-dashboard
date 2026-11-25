"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui";

export default function SetNewPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<"" | "auth.passMin" | "auth.passMismatch">("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const p = String(f.get("password"));
        if (p.length < 8) return setError("auth.passMin");
        if (p !== f.get("confirm")) return setError("auth.passMismatch");
        router.push("/login");
      }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-[32px] font-bold text-ink">{t("auth.newPassTitle")}</h1>
        <p className="mt-1 text-muted">{t("auth.newPassSub")}</p>
      </div>
      <Field label={t("auth.newPass")}>
        <input name="password" type="password" className="input" placeholder={t("auth.newPassPh")} />
      </Field>
      <Field label={t("auth.confirmPass")}>
        <input name="confirm" type="password" className="input" placeholder={t("auth.confirmPassPh")} />
      </Field>
      {error && <p className="text-[13px] text-bad">{t(error)}</p>}
      <button className="btn w-full">{t("auth.updatePassword")}</button>
    </form>
  );
}
