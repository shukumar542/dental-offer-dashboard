"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, FilterSelect, IconBtn, PageTitle } from "@/components/ui";

export default function FaqPage() {
  const { t } = useTranslation();
  const { faqs, deleteFaq } = useAdminData();
  const [filter, setFilter] = useState("");
  const [del, setDel] = useState<number | null>(null);
  const rows = faqs.filter((f) => !filter || filter === "all" || f.audience === filter);

  return (
    <div>
      <PageTitle title={t("faq.title")}>
        <FilterSelect
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: t("faqX.all") },
            { value: "Customer", label: t("faqX.customerFaqs") },
            { value: "Clinic", label: t("faqX.clinicFaqs") },
          ]}
        />
        <Link
          href="/faq/new"
          className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white"
        >
          <Plus size={16} /> {t("common.addNew")}
        </Link>
      </PageTitle>
      <div className="space-y-4">
        {rows.length === 0 && <p className="py-10 text-center text-[14px] text-muted">{t("common.noResults")}</p>}
        {rows.map((f) => (
          <article key={f.id} className="overflow-hidden rounded-[16px] border border-line bg-panel2">
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <h3 className="text-[17px] font-semibold" dir="auto">
                {f.q}
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden rounded-full bg-sky px-2.5 py-0.5 text-[11px] font-medium text-navy sm:inline">
                  {t(`faqX.${f.audience}`)}
                </span>
                <Link
                  href={`/faq/${f.id}/edit`}
                  aria-label={t("common.edit")}
                  title={t("common.edit")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-navy hover:opacity-80"
                >
                  <Pencil size={14} />
                </Link>
                <IconBtn label={t("common.delete")} tone="red" onClick={() => setDel(f.id)}>
                  <Trash2 size={14} />
                </IconBtn>
              </div>
            </header>
            <p className="px-4 py-3 text-[14px] text-muted" dir="auto">
              {f.a}
            </p>
          </article>
        ))}
      </div>

      <ConfirmModal
        open={del !== null}
        title={t("faqX.delTitle")}
        message={t("faqX.delMsg")}
        onCancel={() => setDel(null)}
        onConfirm={() => {
          if (del !== null) deleteFaq(del);
          setDel(null);
        }}
      />
    </div>
  );
}
