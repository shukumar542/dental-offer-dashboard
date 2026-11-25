"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Lock } from "lucide-react";
import InfoEditPage from "@/components/InfoEditPage";
import { Field, Modal } from "@/components/ui";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [pwd, setPwd] = useState(false);
  return (
    <>
      <InfoEditPage
        title={t("profile.title")}
        panelTitle={t("profile.panel")}
        updateLabel={t("profile.update")}
        header={
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[24px] bg-sky text-[32px] font-bold italic text-navy">
            R
          </div>
        }
        fields={[
          { key: "name", label: t("profile.fullName"), value: "Roberts Junior" },
          { key: "email", label: t("profile.email"), value: "robert@junior.com" },
          { key: "phone", label: t("profile.phone"), value: "+9750-555-0832" },
        ]}
        extra={
          <button className="btn" onClick={() => setPwd(true)}>
            <Lock size={16} /> {t("auth.updatePassword")}
          </button>
        }
      />
      <Modal open={pwd} title={t("auth.updatePassword")} onClose={() => setPwd(false)}>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setPwd(false);
          }}
        >
          <Field label={t("profile.currentPassword")}>
            <input type="password" required className="input" />
          </Field>
          <Field label={t("profile.newPassword")}>
            <input type="password" required minLength={8} className="input" />
          </Field>
          <Field label={t("profile.confirmNew")}>
            <input type="password" required minLength={8} className="input" />
          </Field>
          <button className="btn w-full">{t("auth.updatePassword")}</button>
        </form>
      </Modal>
    </>
  );
}
