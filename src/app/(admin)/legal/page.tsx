"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import { InfoGrid, PageTitle, Panel } from "@/components/ui";

const LEGAL_FIELDS = [
  { key: "name", label: "legal.companyName", def: "DentalOffers", translated: false },
  { key: "type", label: "legal.businessType", def: "legal.businessTypeValue", translated: true },
  { key: "country", label: "legal.country", def: "legal.countryValue", translated: true },
  { key: "email", label: "legal.email", def: "support@dentaloffers.com", translated: false },
  { key: "phone", label: "legal.phone", def: "+9750-555-0832", translated: false },
  { key: "website", label: "legal.website", def: "www.dentaloffers.com", translated: false },
] as const;

export default function LegalPage() {
  const { t } = useTranslation();
  const { legal } = useAdminData();
  return (
    <div className="space-y-4">
      <PageTitle title={t("legal.title")} />
      <Panel title={t("legal.panel")}>
        <InfoGrid
          items={LEGAL_FIELDS.map((f) => [t(f.label), legal[f.key] ?? (f.translated ? t(f.def) : f.def)])}
        />
      </Panel>
      <Link href="/legal/edit" className="btn inline-flex">
        {t("legal.update")}
      </Link>
    </div>
  );
}
