"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import FaqForm from "@/components/FaqForm";
import { PageTitle } from "@/components/ui";

export default function EditFaqPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { faqs } = useAdminData();
  const faq = faqs.find((f) => String(f.id) === id);
  if (!faq)
    return (
      <div>
        <PageTitle title={t("faq.title")} />
        <p className="text-muted">{t("common.noResults")}</p>
      </div>
    );
  return <FaqForm key={faq.id} faq={faq} />;
}
