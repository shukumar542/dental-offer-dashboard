"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { Avatar, FilterSelect, PageTitle, SearchBox, StatusBadge, TableCard, usePaged } from "@/components/ui";
import { kyc } from "@/lib/data";

export default function VerificationPage() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const filtered = kyc.filter(
    (r) => r.clinic.toLowerCase().includes(q.toLowerCase()) && (!status || r.status === status),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);

  return (
    <div>
      <PageTitle title={t("verification.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <FilterSelect value={status} onChange={(v) => (setStatus(v), setPage(1))} options={["Pending", "Verified", "Rejected"]} />
      </PageTitle>
      <TableCard
        empty={filtered.length === 0}
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            {["verification.clinicName", "verification.type", "verification.requested", "common.status"].map((h) => (
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
              <span className="flex max-w-[240px] items-center gap-3 text-[16px]">
                <Avatar name={r.clinic} /> <span className="truncate">{r.clinic}</span>
              </span>
            </td>
            <td className="td">{t(`kycType.${r.type}`, { defaultValue: r.type })}</td>
            <td className="td">{r.requested}</td>
            <td className="td">
              <StatusBadge status={r.status} />
            </td>
            <td className="td">
              <div className="flex justify-end">
                <Link
                  href={`/verification/${r.id}`}
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
