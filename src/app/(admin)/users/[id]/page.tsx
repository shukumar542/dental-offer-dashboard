"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, UserCheck } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { ConfirmModal, InfoGrid, PageTitle, Panel, StatusBadge } from "@/components/ui";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { users, toggleUser } = useAdminData();
  const [confirm, setConfirm] = useState(false);
  const user = users.find((u) => String(u.id) === id);

  if (!user)
    return (
      <div>
        <PageTitle title={t("userX.details")} />
        <p className="text-muted">{t("common.noResults")}</p>
      </div>
    );

  const blocking = user.status === "Active";
  return (
    <div className="space-y-4">
      <PageTitle title={t("userX.details")} />
      <Panel title={t("userX.info")}>
        <InfoGrid
          items={[
            [t("userX.name"), user.name],
            [t("userX.phone"), user.phone],
            [t("userX.joined"), user.joined],
          ]}
        />
        <div className="mt-5">
          <p className="text-[14px] text-muted">{t("userX.status")}</p>
          <StatusBadge status={user.status} />
        </div>
      </Panel>
      <button
        onClick={() => setConfirm(true)}
        className={`inline-flex h-[50px] items-center gap-2 rounded-[10px] px-6 font-semibold text-white ${
          blocking ? "bg-bad" : "bg-navy"
        }`}
      >
        {blocking ? <Ban size={18} /> : <UserCheck size={18} />}
        {blocking ? t("userX.block") : t("userX.unblock")}
      </button>
      <ConfirmModal
        open={confirm}
        title={blocking ? t("users.blockTitle") : t("users.unblockTitle")}
        message={blocking ? t("users.blockMsg") : t("users.unblockMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          toggleUser(user.id);
          setConfirm(false);
        }}
      />
    </div>
  );
}
