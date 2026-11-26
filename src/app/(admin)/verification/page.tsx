"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { Avatar, FilterSelect, PageTitle, SearchBox, StatusBadge, TableCard, usePaged } from "@/components/ui";

export default function VerificationPage() {
  const { t } = useTranslation();
  const { clinics } = useAdminData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const filtered = clinics.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) &&
      (!status || status === "all" || r.verification === status),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);

  return (
    <div>
      <PageTitle title={t("verification.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <FilterSelect
          value={status}
          onChange={(v) => (setStatus(v), setPage(1))}
          options={[{ value: "all", label: t("kycX.all") }, "Pending", "Verified", "Rejected"]}
        />
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
                <Avatar name={r.name} /> <span className="truncate">{r.name}</span>
              </span>
            </td>
            <td className="td">{t(`kycType.${r.regType}`, { defaultValue: r.regType })}</td>
            <td className="td">{r.submitted}</td>
            <td className="td">
              <StatusBadge status={r.verification} />
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
