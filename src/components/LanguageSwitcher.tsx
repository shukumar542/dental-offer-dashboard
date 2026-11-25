"use client";

import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { LANGS } from "@/i18n";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "en";
  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className="flex items-center gap-1 rounded-[10px] bg-panel p-1 text-[13px]"
    >
      <Languages size={15} className="mx-1 text-muted" />
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => i18n.changeLanguage(l)}
          aria-pressed={current === l}
          className={`rounded-lg px-3 py-1.5 font-medium transition ${
            current === l ? "bg-navy text-white" : "text-ink hover:bg-white"
          }`}
        >
          {t(`lang.${l}`)}
        </button>
      ))}
    </div>
  );
}
