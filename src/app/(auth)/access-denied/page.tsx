"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ShieldAlert } from "lucide-react";

export default function AccessDeniedPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bad/10 text-bad">
        <ShieldAlert size={28} />
      </span>
      <h1 className="text-[28px] font-bold text-ink">{t("acctX.deniedTitle")}</h1>
      <p className="text-[15px] text-muted">{t("acctX.deniedMsg")}</p>
      <Link href="/login" className="btn w-full">
        {t("acctX.deniedBack")}
      </Link>
    </div>
  );
}
