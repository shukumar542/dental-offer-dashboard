"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, Field, PageTitle, Panel } from "@/components/ui";

export default function ProfileEditPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { profile, saveProfile } = useAdminData();
  const [name, setName] = useState(profile.name ?? "Roberts Junior");
  const [phone, setPhone] = useState(profile.phone ?? "+9750-555-0832");
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageTitle title={t("profile.title")} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirm(true);
        }}
      >
        <Panel title={t("acctX.profileEditTitle")} subtitle={t("acctX.profileEditSub")}>
          <div className="space-y-4">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[24px] bg-sky text-[32px] font-bold italic text-navy">
              {name.trim()[0] ?? "R"}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t("profile.fullName")}>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
              </Field>
              <Field label={t("profile.phone")}>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
              </Field>
            </div>
            <p className="rounded-[10px] bg-[#fef2f2] px-4 py-3 text-[12px] text-[#dc2626]">{t("acctX.emailRestricted")}</p>
            <button className="btn">{t("acctX.save")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={t("acctX.profileTitle")}
        message={t("acctX.profileMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          saveProfile({ name: name.trim(), phone: phone.trim() });
          setConfirm(false);
          router.push("/profile");
        }}
      />
    </div>
  );
}
