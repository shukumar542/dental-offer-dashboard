"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InfoGrid, PageTitle, Panel, StatusBadge } from "@/components/ui";
import { help } from "@/lib/data";

export default function HelpDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const item = help.find((h) => String(h.id) === id) ?? help[0];
  const [status, setStatus] = useState<string>(item.status);
  const reason = t(`help.${item.reason}`, { defaultValue: item.reason });

  return (
    <div>
      <PageTitle title={t("help.request")} />
      <Panel title={reason} subtitle={t("help.submittedAt", { date: item.submitted })}>
        <div className="space-y-6">
          <InfoGrid
            items={[
              [t("help.name"), item.name],
              [t("help.accountType"), t(`help.${item.role}`)],
              [t("help.reason"), reason],
              [t("help.submitted"), item.submitted],
            ]}
          />
          <div>
            <p className="text-[14px] text-muted">{t("help.message")}</p>
            <p className="mt-1 rounded-[12px] bg-white p-4 text-[15px] text-ink" dir="auto">
              {item.message}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={status} />
            {status === "To Do" && (
              <button className="btn" onClick={() => setStatus("Resolved")}>
                {t("help.resolve")}
              </button>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
