"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useAdminData } from "./AdminData";
import { ConfirmModal, Field, PageTitle, Panel } from "./ui";
import type { Audience, Faq } from "@/lib/data";

export default function FaqForm({ faq }: { faq?: Faq }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { addFaq, updateFaq } = useAdminData();
  const edit = !!faq;
  const [q, setQ] = useState(faq?.q ?? "");
  const [a, setA] = useState(faq?.a ?? "");
  const [audience, setAudience] = useState<Audience | "">(faq?.audience ?? "");
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageTitle title={t("faq.title")} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!q.trim() || !a.trim() || !audience) return setError(true);
          setError(false);
          setConfirm(true);
        }}
      >
        <Panel
          title={edit ? t("faqX.updateTitle") : t("faqX.addTitle")}
          subtitle={edit ? t("faqX.updateSub") : t("faqX.addSub")}
        >
          <div className="space-y-5">
            <Field label={t("faqX.question")}>
              <input value={q} onChange={(e) => setQ(e.target.value)} dir="auto" className="input" placeholder={t("faqX.questionPh")} />
            </Field>
            <Field label={t("faqX.answer")}>
              <textarea
                rows={4}
                value={a}
                onChange={(e) => setA(e.target.value)}
                dir="auto"
                placeholder={t("faqX.answerPh")}
                className="min-h-[110px] w-full rounded-[10px] bg-[#ebecee] p-4 text-[15px] outline-none placeholder:text-muted focus:ring-2 focus:ring-navy/30"
              />
            </Field>
            <Field label={t("faqX.forLabel")}>
              <div className="relative">
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                  className={`input appearance-none pe-10 ${audience ? "text-ink" : "text-muted"}`}
                >
                  <option value="">{t("faqX.selectAudience")}</option>
                  <option value="Customer">{t("faqX.Customer")}</option>
                  <option value="Clinic">{t("faqX.Clinic")}</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute end-4 top-[17px] text-muted" />
              </div>
            </Field>
            {error && <p className="text-[13px] text-bad">{t("faqX.required")}</p>}
            <button className="btn">{edit ? t("faqX.saveBtn") : t("faqX.addBtn")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={edit ? t("faqX.saveConfirmTitle") : t("faqX.addConfirmTitle")}
        message={edit ? t("faqX.saveConfirmMsg") : t("faqX.addConfirmMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          const data = { q: q.trim(), a: a.trim(), audience: audience as Audience };
          if (faq) updateFaq(faq.id, data);
          else addFaq(data);
          setConfirm(false);
          router.push("/faq");
        }}
      />
    </div>
  );
}
