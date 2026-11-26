"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import CategoryForm from "@/components/CategoryForm";
import { PageTitle } from "@/components/ui";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { categories } = useAdminData();
  const category = categories.find((c) => String(c.id) === id);
  if (!category)
    return (
      <div>
        <PageTitle title={t("category.title")} />
        <p className="text-muted">{t("common.noResults")}</p>
      </div>
    );
  return <CategoryForm key={category.id} category={category} />;
}
