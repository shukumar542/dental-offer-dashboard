"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminData } from "./AdminData";
import { ConfirmModal, Field, PageTitle, Panel } from "./ui";
import type { Category } from "@/lib/data";

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { addCategory, updateCategory } = useAdminData();
  const edit = !!category;
  const [name, setName] = useState(category?.name ?? "");
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageTitle title={t("category.title")} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return setError(true);
          setError(false);
          setConfirm(true);
        }}
      >
        <Panel
          title={edit ? t("catX.updateTitle") : t("catX.addTitle")}
          subtitle={edit ? t("catX.updateSub") : t("catX.addSub")}
        >
          <div className="space-y-5">
            <Field label={t("catX.label")}>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder={t("catX.ph")}
              />
            </Field>
            {error && <p className="text-[13px] text-bad">{t("catX.required")}</p>}
            <button className="btn">{edit ? t("catX.saveBtn") : t("catX.addBtn")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={edit ? t("catX.saveConfirmTitle") : t("catX.addConfirmTitle")}
        message={t(edit ? "catX.saveConfirmMsg" : "catX.addConfirmMsg", { name: name.trim() })}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          if (category) updateCategory(category.id, name.trim());
          else addCategory(name.trim());
          setConfirm(false);
          router.push("/treatment-category");
        }}
      />
    </div>
  );
}
