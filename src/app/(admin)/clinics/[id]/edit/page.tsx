"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import ClinicForm from "@/components/ClinicForm";
import { PageTitle } from "@/components/ui";

export default function EditClinicPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { clinics } = useAdminData();
  const clinic = clinics.find((c) => String(c.id) === id);
  return (
    <div>
      <PageTitle title={t("clinics.updateTitle")} />
      {clinic ? <ClinicForm mode="edit" clinic={clinic} /> : <p className="text-muted">{t("clinicX.notFound")}</p>}
    </div>
  );
}
