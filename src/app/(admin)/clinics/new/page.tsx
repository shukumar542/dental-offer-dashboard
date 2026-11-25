"use client";

import { useTranslation } from "react-i18next";
import ClinicForm from "@/components/ClinicForm";
import { PageTitle } from "@/components/ui";

export default function NewClinicPage() {
  const { t } = useTranslation();
  return (
    <div>
      <PageTitle title={t("clinics.addTitle")} />
      <ClinicForm mode="add" />
    </div>
  );
}
