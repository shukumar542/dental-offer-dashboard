"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Lock, UserCog } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { InfoGrid, PageTitle, Panel } from "@/components/ui";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { profile } = useAdminData();
  return (
    <div className="space-y-4">
      <PageTitle title={t("profile.title")} />
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[24px] bg-sky text-[32px] font-bold italic text-navy">
        {(profile.name ?? "Roberts Junior")[0]}
      </div>
      <Panel title={t("profile.panel")}>
        <InfoGrid
          items={[
            [t("profile.fullName"), profile.name ?? "Roberts Junior"],
            [t("profile.email"), "robert@junior.com"],
            [t("profile.phone"), profile.phone ?? "+9750-555-0832"],
          ]}
        />
      </Panel>
      <div className="flex flex-wrap gap-3">
        <Link href="/profile/edit" className="btn">
          <UserCog size={16} /> {t("profile.update")}
        </Link>
        <Link href="/profile/password" className="btn">
          <Lock size={16} /> {t("auth.updatePassword")}
        </Link>
      </div>
    </div>
  );
}
