"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { Avatar, FilterSelect, PageTitle, StatusBadge, TableCard, usePaged } from "@/components/ui";

export default function HelpSupportPage() {
  const { t } = useTranslation();
  const { help } = useAdminData();
  const [status, setStatus] = useState("");
  const filtered = help.filter((r) => !status || status === "all" || r.status === status);
  const { slice, page, pages, setPage } = usePaged(filtered);

  return (
    <div>
      <PageTitle title={t("help.title")}>
        <FilterSelect
          value={status}
          onChange={(v) => (setStatus(v), setPage(1))}
          options={[{ value: "all", label: t("helpX.all") }, "To Do", "Resolved"]}
        />
      </PageTitle>
      <TableCard
        empty={filtered.length === 0}
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            {["help.users", "help.reason", "help.submitted", "common.status"].map((h) => (
              <th key={h} className="th">
                {t(h)}
              </th>
            ))}
            <th className="th text-end">{t("common.actions")}</th>
          </>
        }
      >
        {slice.map((r) => (
          <tr key={r.id}>
            <td className="td">
              <span className="flex items-center gap-3">
                <Avatar name={r.name} />
                <span className="leading-tight">
                  <span className="block text-[16px]">{r.name}</span>
                  <span className="text-[14px] text-muted/80">{t(`help.${r.role}`)}</span>
                </span>
              </span>
            </td>
            <td className="td">{t(`help.${r.reason}`, { defaultValue: r.reason })}</td>
            <td className="td">{r.submitted}</td>
            <td className="td">
              <StatusBadge status={r.status} />
            </td>
            <td className="td">
              <div className="flex justify-end">
                <Link
                  href={`/help-support/${r.id}`}
                  aria-label={t("common.view")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-navy"
                >
                  <Eye size={15} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </TableCard>
    </div>
  );
}
