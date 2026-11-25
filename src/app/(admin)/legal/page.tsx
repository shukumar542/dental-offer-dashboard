"use client";

import { useTranslation } from "react-i18next";
import InfoEditPage from "@/components/InfoEditPage";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <InfoEditPage
      title={t("legal.title")}
      panelTitle={t("legal.panel")}
      updateLabel={t("legal.update")}
      fields={[
        { key: "name", label: t("legal.companyName"), value: "DentalOffers" },
        { key: "type", label: t("legal.businessType"), value: "legal.businessTypeValue", valueKey: true },
        { key: "country", label: t("legal.country"), value: "legal.countryValue", valueKey: true },
        { key: "email", label: t("legal.email"), value: "support@dentaloffers.com" },
        { key: "phone", label: t("legal.phone"), value: "+9750-555-0832" },
        { key: "web", label: t("legal.website"), value: "www.dentaloffers.com" },
      ]}
    />
  );
}
