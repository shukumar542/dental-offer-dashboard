"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmModal, IconBtn, Modal, PageTitle } from "@/components/ui";
import { faqs } from "@/lib/data";

type Faq = { id: number; q: string; a: string };

export default function FaqPage() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Faq[]>(faqs);
  const [edit, setEdit] = useState<Faq | null>(null);
  const [del, setDel] = useState<number | null>(null);

  const save = () => {
    if (!edit || !edit.q.trim() || !edit.a.trim()) return;
    setRows(
      rows.some((r) => r.id === edit.id) ? rows.map((r) => (r.id === edit.id ? edit : r)) : [...rows, edit],
    );
    setEdit(null);
  };

  return (
    <div>
      <PageTitle title={t("faq.title")}>
        <button
          onClick={() => setEdit({ id: Date.now(), q: "", a: "" })}
          className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white"
        >
          <Plus size={16} /> {t("common.addNew")}
        </button>
      </PageTitle>
      <div className="space-y-4">
        {rows.map((f) => (
          <article key={f.id} className="overflow-hidden rounded-[16px] border border-line bg-panel2">
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <h3 className="text-[17px] font-semibold" dir="auto">
                {f.q}
              </h3>
              <div className="flex gap-2">
                <IconBtn label={t("common.edit")} tone="sky" onClick={() => setEdit(f)}>
                  <Pencil size={14} />
                </IconBtn>
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

      <Modal open={!!edit} title={t("faq.modal")} onClose={() => setEdit(null)}>
        <div className="space-y-3">
          <input
            value={edit?.q ?? ""}
            onChange={(e) => edit && setEdit({ ...edit, q: e.target.value })}
            placeholder={t("faq.question")}
            className="input"
            dir="auto"
          />
          <textarea
            value={edit?.a ?? ""}
            onChange={(e) => edit && setEdit({ ...edit, a: e.target.value })}
            placeholder={t("faq.answer")}
            rows={4}
            dir="auto"
            className="w-full rounded-[10px] bg-[#ebecee] p-4 text-[15px] outline-none"
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={() => setEdit(null)} className="h-12 rounded-[10px] bg-panel font-medium text-muted">
            {t("common.cancel")}
          </button>
          <button onClick={save} className="h-12 rounded-[10px] bg-navy font-medium text-white">
            {t("common.save")}
          </button>
        </div>
      </Modal>
      <ConfirmModal
        open={del !== null}
        title={t("faq.deleteTitle")}
        message={t("faq.deleteMsg")}
        confirmLabel={t("common.delete")}
        onCancel={() => setDel(null)}
        onConfirm={() => {
          setRows(rows.filter((r) => r.id !== del));
          setDel(null);
        }}
      />
    </div>
  );
}
