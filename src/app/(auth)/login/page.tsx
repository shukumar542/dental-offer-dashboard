"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { Field } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (!f.get("email") || !f.get("password")) return setError(true);
        // Demo: an email starting with "blocked" simulates a blocked/invalid admin.
        router.push(String(f.get("email")).toLowerCase().startsWith("blocked") ? "/access-denied" : "/dashboard");
      }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-[32px] font-bold leading-tight text-ink">
          {t("auth.loginTitle", { brand: "__BRAND__" })
            .split("__BRAND__")
            .flatMap((part, i, arr) =>
              i < arr.length - 1
                ? [part, <span key={i} className="text-gold">Offers</span>]
                : [part],
            )}
        </h1>
        <p className="mt-1 text-muted">{t("auth.loginSub")}</p>
      </div>
      <Field label={t("auth.email")}>
        <input name="email" type="email" className="input" placeholder={t("auth.emailPh")} />
      </Field>
      <Field label={t("auth.password")}>
        <div className="relative">
          <input
            name="password"
            type={show ? "text" : "password"}
            className="input pe-12"
            placeholder={t("auth.passwordPh")}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute end-4 top-4 text-muted"
            aria-label={t("auth.togglePassword")}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </Field>
      <div className="flex items-center justify-between text-[15px]">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" /> {t("auth.remember")}
        </label>
        <Link href="/forgot-password" className="font-semibold">
          {t("auth.forgot")}
        </Link>
      </div>
      {error && <p className="text-[13px] text-bad">{t("auth.required")}</p>}
      <button className="btn w-full">{t("auth.login")}</button>
    </form>
  );
}
