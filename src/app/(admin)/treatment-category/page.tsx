"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmModal, IconBtn, Modal, PageTitle, TableCard, usePaged } from "@/components/ui";
import { categories } from "@/lib/data";

export default function TreatmentCategoryPage() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(categories);
  const [edit, setEdit] = useState<{ index: number | null; value: string } | null>(null);
  const [del, setDel] = useState<number | null>(null);
  const { slice, page, pages, setPage } = usePaged(rows);
  const offset = (page - 1) * 9;

  const save = () => {
    if (!edit || !edit.value.trim()) return;
    if (edit.index === null) {
      setRows([...rows, edit.value.trim()]);
      setPage(Math.ceil((rows.length + 1) / 9)); // jump to the page showing the new item
    } else {
      setRows(rows.map((r, i) => (i === edit.index ? edit.value.trim() : r)));
    }
    setEdit(null);
  };

  return (
    <div>
      <PageTitle title={t("category.title")}>
        <button
          onClick={() => setEdit({ index: null, value: "" })}
          className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white"
        >
          <Plus size={16} /> {t("common.addNew")}
        </button>
      </PageTitle>
      <TableCard
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            <th className="th w-[70px]">{t("common.sl")}</th>
            <th className="th">{t("category.service")}</th>
            <th className="th text-end">{t("common.actions")}</th>
          </>
        }
      >
        {slice.map((name, i) => (
          <tr key={name + i}>
            <td className="td font-medium text-ink">{String(offset + i + 1).padStart(2, "0")}</td>
            <td className="td text-[15px]">{name}</td>
            <td className="td">
              <div className="flex justify-end gap-2">
                <IconBtn label={t("common.edit")} tone="sky" onClick={() => setEdit({ index: offset + i, value: name })}>
                  <Pencil size={15} />
                </IconBtn>
                <IconBtn label={t("common.delete")} tone="red" onClick={() => setDel(offset + i)}>
                  <Trash2 size={15} />
                </IconBtn>
              </div>
            </td>
          </tr>
        ))}
      </TableCard>

      <Modal
        open={!!edit}
        title={edit?.index === null ? t("category.addTitle") : t("category.editTitle")}
        onClose={() => setEdit(null)}
      >
        <input
          autoFocus
          value={edit?.value ?? ""}
          onChange={(e) => edit && setEdit({ ...edit, value: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && save()}
          placeholder={t("category.ph")}
          className="input"
        />
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
        title={t("category.deleteTitle")}
        message={t("category.deleteMsg")}
        confirmLabel={t("common.delete")}
        onCancel={() => setDel(null)}
        onConfirm={() => {
          setRows(rows.filter((_, i) => i !== del));
          setDel(null);
        }}
      />
    </div>
  );
}
