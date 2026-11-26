"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, Field, PageTitle, Panel } from "@/components/ui";

const FIELDS = [
  { key: "name", label: "legal.companyName", def: "DentalOffers", translated: false },
  { key: "type", label: "legal.businessType", def: "legal.businessTypeValue", translated: true },
  { key: "country", label: "legal.country", def: "legal.countryValue", translated: true },
  { key: "email", label: "legal.email", def: "support@dentaloffers.com", translated: false },
  { key: "phone", label: "legal.phone", def: "+9750-555-0832", translated: false },
  { key: "website", label: "legal.website", def: "www.dentaloffers.com", translated: false },
] as const;

export default function LegalEditPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { legal, saveLegal } = useAdminData();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(FIELDS.map((f) => [f.key, legal[f.key] ?? (f.translated ? t(f.def) : f.def)])),
  );
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageTitle title={t("legal.title")} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirm(true);
        }}
      >
        <Panel title={t("acctX.legalEditTitle")} subtitle={t("acctX.legalEditSub")}>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {FIELDS.map((f) => (
                <Field key={f.key} label={t(f.label)}>
                  <input
                    required
                    value={values[f.key]}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className="input"
                  />
                </Field>
              ))}
            </div>
            <button className="btn">{t("acctX.save")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={t("acctX.legalTitle")}
        message={t("acctX.legalMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          saveLegal(values);
          setConfirm(false);
          router.push("/legal");
        }}
      />
    </div>
  );
}
