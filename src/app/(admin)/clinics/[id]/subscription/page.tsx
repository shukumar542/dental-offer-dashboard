"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, Field, PageTitle, Panel } from "@/components/ui";
import type { PlanKey } from "@/lib/data";

const PLANS: PlanKey[] = ["trial", "monthly", "six", "yearly"];
const MONTHS: Record<Exclude<PlanKey, "trial">, number> = { monthly: 1, six: 6, yearly: 12 };

const fmt = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function AssignSubscriptionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { clinics, setSubscription } = useAdminData();
  const clinic = clinics.find((c) => String(c.id) === id);

  const [plan, setPlan] = useState<PlanKey>(clinic?.subscription?.plan ?? "trial");
  const [start, setStart] = useState(clinic?.subscription?.trialStart ?? "");
  const [end, setEnd] = useState(clinic?.subscription?.trialEnd ?? "");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  if (!clinic)
    return (
      <div>
        <PageTitle title={t("clinicX.subTitle")} />
        <p className="text-muted">{t("clinicX.notFound")}</p>
      </div>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plan === "trial") {
      if (!start || !end) return setError(t("clinicX.trialRequired"));
      if (end <= start) return setError(t("clinicX.trialOrder"));
    }
    setError("");
    setConfirm(true);
  };

  const save = () => {
    if (plan === "trial") {
      setSubscription(clinic.id, { plan, expires: fmt(new Date(end)), trialStart: start, trialEnd: end });
    } else {
      const d = new Date();
      d.setMonth(d.getMonth() + MONTHS[plan]);
      setSubscription(clinic.id, { plan, expires: fmt(d) });
    }
    setConfirm(false);
    router.push(`/clinics/${clinic.id}`);
  };

  return (
    <div>
      <PageTitle title={t("clinicX.subTitle")} />
      <form onSubmit={submit}>
        <Panel title={t("clinicX.subTitle")} subtitle={t("clinicX.subSub")}>
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-[16px] font-medium">{t("clinicX.choosePlan")}</p>
              <div role="radiogroup" className="inline-flex flex-wrap gap-1 rounded-[12px] bg-sky p-1">
                {PLANS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={plan === p}
                    onClick={() => setPlan(p)}
                    className={`min-w-[130px] rounded-[10px] px-5 py-3 text-[15px] font-medium transition ${
                      plan === p ? "bg-white text-navy shadow-sm" : "text-muted hover:text-ink"
                    }`}
                  >
                    {t(`clinicX.plans.${p}`)}
                  </button>
                ))}
              </div>
            </div>

            {plan === "trial" && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={t("clinicX.trialStart")}>
                  <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="input"
                    aria-label={t("clinicX.selectStart")}
                  />
                </Field>
                <Field label={t("clinicX.trialEnd")}>
                  <input
                    type="date"
                    value={end}
                    min={start || undefined}
                    onChange={(e) => setEnd(e.target.value)}
                    className="input"
                    aria-label={t("clinicX.selectEnd")}
                  />
                </Field>
              </div>
            )}

            {error && <p className="text-[13px] text-bad">{error}</p>}
            <button className="btn">{t("clinicX.saveContinue")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={t("clinicX.subConfirmTitle")}
        message={t("clinicX.subConfirmMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={save}
      />
    </div>
  );
}
