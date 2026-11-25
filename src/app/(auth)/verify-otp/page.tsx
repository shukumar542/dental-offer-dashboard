"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const set = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/set-new-password");
      }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-[32px] font-bold text-ink">{t("auth.otpTitle")}</h1>
        <p className="mt-1 text-muted">{t("auth.otpSub")}</p>
      </div>
      <div>
        <span className="mb-2 block text-[15px] font-medium text-muted">{t("auth.otpLabel")}</span>
        <div className="grid grid-cols-6 gap-3" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => e.key === "Backspace" && !d && i > 0 && refs.current[i - 1]?.focus()}
              className="h-[54px] rounded-[10px] bg-[#ebecee] text-center text-[20px] font-semibold outline-none focus:ring-2 focus:ring-navy/30"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-[15px]">
        <span>{t("auth.noCode")}</span>
        {seconds > 0 ? (
          <span>
            {t("auth.resendIn")} <b dir="ltr">00:{String(seconds).padStart(2, "0")}</b>
          </span>
        ) : (
          <button type="button" onClick={() => setSeconds(30)} className="font-bold">
            {t("auth.resend")}
          </button>
        )}
      </div>
      <button className="btn w-full" disabled={digits.some((d) => !d)}>
        {t("auth.verifyCode")}
      </button>
    </form>
  );
}
