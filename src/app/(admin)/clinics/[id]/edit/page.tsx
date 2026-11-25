"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import ClinicForm from "@/components/ClinicForm";
import { PageTitle } from "@/components/ui";
import { clinics } from "@/lib/data";

export default function EditClinicPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const clinic = clinics.find((c) => String(c.id) === id);
  return (
    <div>
      <PageTitle title={t("clinics.updateTitle")} />
      <ClinicForm
        mode="edit"
        defaults={{
          name: clinic?.name,
          phone: clinic?.phone,
          address: clinic?.address,
          services: ["Dental Implants", "Orthodontics"],
        }}
      />
    </div>
  );
}
