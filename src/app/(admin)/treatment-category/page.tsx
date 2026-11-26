"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, IconBtn, PageTitle, TableCard, usePaged } from "@/components/ui";

export default function TreatmentCategoryPage() {
  const { t } = useTranslation();
  const { categories, deleteCategory } = useAdminData();
  const [del, setDel] = useState<number | null>(null);
  const { slice, page, pages, setPage } = usePaged(categories);
  const offset = (page - 1) * 9;
  const target = categories.find((c) => c.id === del);

  return (
    <div>
      <PageTitle title={t("category.title")}>
        <Link
          href="/treatment-category/new"
          className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white"
        >
          <Plus size={16} /> {t("common.addNew")}
        </Link>
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
        {slice.map((c, i) => (
          <tr key={c.id}>
            <td className="td font-medium text-ink">{String(offset + i + 1).padStart(2, "0")}</td>
            <td className="td text-[15px]">{c.name}</td>
            <td className="td">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/treatment-category/${c.id}/edit`}
                  aria-label={t("common.edit")}
                  title={t("common.edit")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-navy hover:opacity-80"
                >
                  <Pencil size={15} />
                </Link>
                <IconBtn label={t("common.delete")} tone="red" onClick={() => setDel(c.id)}>
                  <Trash2 size={15} />
                </IconBtn>
              </div>
            </td>
          </tr>
        ))}
      </TableCard>

      <ConfirmModal
        open={!!target}
        title={t("catX.delTitle")}
        message={t("catX.delMsg", { name: target?.name ?? "" })}
        onCancel={() => setDel(null)}
        onConfirm={() => {
          if (del !== null) deleteCategory(del);
          setDel(null);
        }}
      />
    </div>
  );
}
