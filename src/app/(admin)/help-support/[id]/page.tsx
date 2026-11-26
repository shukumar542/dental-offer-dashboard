"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, User } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { Avatar, ConfirmModal, PageTitle, Panel, StatusBadge } from "@/components/ui";

export default function HelpDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { help, resolveHelp } = useAdminData();
  const [confirm, setConfirm] = useState(false);
  const item = help.find((h) => String(h.id) === id);

  if (!item)
    return (
      <div>
        <PageTitle title={t("helpX.details")} />
        <p className="text-muted">{t("common.noResults")}</p>
      </div>
    );

  const isClinic = item.role === "Clinic";
  const reason = t(`help.${item.reason}`, { defaultValue: item.reason });
  const resolved = item.status === "Resolved";

  return (
    <div className="space-y-5">
      <PageTitle title={t("helpX.details")} />

      <Panel title={t("helpX.requestedBy")}>
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-[14px] text-[#5b6470]">
          <span className="flex min-w-[220px] items-center gap-3 text-[16px]">
            <Avatar name={item.name} />
            <span className="leading-tight">
              <span className="block">{item.name}</span>
              <span className="text-[13px] text-muted/80">{t(`help.${item.role}`)}</span>
            </span>
          </span>
          <span dir="ltr">{item.phone}</span>
          {isClinic && <span>{item.address}</span>}
          <span>{item.joined}</span>
          <StatusBadge status={item.accountStatus} />
          <Link
            href={isClinic ? "/clinics" : "/users"}
            aria-label={t("common.view")}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white"
          >
            <User size={15} />
          </Link>
        </div>
      </Panel>

      <Panel title={t("helpX.info")}>
        <div className="space-y-5">
          <div>
            <p className="text-[14px] text-muted">{t("help.reason")}</p>
            <p className="text-[16px] font-medium">{reason}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-[14px] text-muted">{t("help.submitted")}</p>
              <p className="text-[16px] font-medium">{item.submitted}</p>
            </div>
            <div>
              <p className="text-[14px] text-muted">{t("common.status")}</p>
              <StatusBadge status={item.status} />
            </div>
          </div>
          <div>
            <p className="text-[14px] text-muted">{t("helpX.description")}</p>
            <p className="text-[16px] font-medium leading-relaxed" dir="auto">
              {item.message}
            </p>
          </div>
        </div>
      </Panel>

      {resolved ? (
        <span className="inline-flex h-[50px] items-center gap-2 rounded-[10px] border border-ok/60 bg-ok/10 px-6 font-semibold text-ok">
          <Check size={18} /> {t("helpX.resolved")}
        </span>
      ) : (
        <button className="btn" onClick={() => setConfirm(true)}>
          {t("helpX.markSolved")}
        </button>
      )}

      <ConfirmModal
        open={confirm}
        title={t("helpX.confirmTitle")}
        message={t("helpX.confirmMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          resolveHelp(item.id);
          setConfirm(false);
        }}
      />
    </div>
  );
}
