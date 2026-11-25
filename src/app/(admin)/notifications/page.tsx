"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Smile } from "lucide-react";
import { PageTitle } from "@/components/ui";
import { notifications } from "@/lib/data";

export default function NotificationsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState(notifications);
  const tx = (s: string) => t(`notifications.${s}`, { defaultValue: s });
  return (
    <div>
      <PageTitle title={t("notifications.title")}>
        <button
          onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}
          className="h-10 rounded-full bg-sky px-4 text-[13px] font-medium text-navy"
        >
          {t("notifications.markAll")}
        </button>
      </PageTitle>
      <div className="space-y-3">
        {items.map((n, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-[16px] p-4 ${n.unread ? "bg-sky" : "bg-panel"}`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white/70 text-navy">
              <Smile size={22} />
            </span>
            <div className="flex-1">
              <p className="text-[17px] font-semibold">{tx(n.title)}</p>
              <p className="text-[15px] text-muted">{tx(n.body)}</p>
            </div>
            <span className="text-[12px] text-ink" dir="ltr">
              {n.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
