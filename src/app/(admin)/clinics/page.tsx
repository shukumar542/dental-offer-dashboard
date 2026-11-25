"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Circle, Pencil, Plus, SlidersHorizontal } from "lucide-react";
import {
  Avatar,
  ConfirmModal,
  FilterSelect,
  IconBtn,
  PageTitle,
  SearchBox,
  StatusBadge,
  TableCard,
  usePaged,
} from "@/components/ui";
import { clinics as seed } from "@/lib/data";

export default function ClinicsPage() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [target, setTarget] = useState<number | null>(null);

  const filtered = rows.filter(
    (r) => r.name.toLowerCase().includes(q.toLowerCase()) && (!status || r.status === status),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);
  const tg = rows.find((r) => r.id === target);
  const blocking = tg?.status === "Active";

  return (
    <div>
      <PageTitle title={t("clinics.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <button
          onClick={() => setShowFilter(!showFilter)}
          aria-label={t("clinics.filters")}
          className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-navy text-white"
        >
          <SlidersHorizontal size={18} />
        </button>
        <Link href="/clinics/new" className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white">
          <Plus size={16} /> {t("clinics.add")}
        </Link>
      </PageTitle>
      {showFilter && (
        <div className="mb-4 flex justify-end">
          <FilterSelect value={status} onChange={(v) => (setStatus(v), setPage(1))} options={["Active", "Blocked"]} />
        </div>
      )}
      <TableCard
        empty={filtered.length === 0}
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            {["clinics.name", "clinics.phone", "clinics.address", "common.joinedOn", "common.status"].map((h) => (
              <th key={h} className="th">
                {t(h)}
              </th>
            ))}
            <th className="th text-end">{t("common.actions")}</th>
          </>
        }
      >
        {slice.map((c) => (
          <tr key={c.id}>
            <td className="td">
              <span className="flex max-w-[230px] items-center gap-3 text-[16px]">
                <Avatar name={c.name} /> <span className="truncate">{c.name}</span>
              </span>
            </td>
            <td className="td">
              <span dir="ltr" className="inline-block">
                {c.phone}
              </span>
            </td>
            <td className="td max-w-[220px] truncate">{c.address}</td>
            <td className="td">{c.joined}</td>
            <td className="td">
              <StatusBadge status={c.status} />
            </td>
            <td className="td">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/clinics/${c.id}/edit`}
                  aria-label={t("clinics.edit")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white"
                >
                  <Pencil size={15} />
                </Link>
                <IconBtn
                  label={c.status === "Active" ? t("clinics.block") : t("clinics.unblock")}
                  tone={c.status === "Active" ? "red" : "green"}
                  onClick={() => setTarget(c.id)}
                >
                  {c.status === "Active" ? <Ban size={15} /> : <Circle size={15} />}
                </IconBtn>
              </div>
            </td>
          </tr>
        ))}
      </TableCard>
      <ConfirmModal
        open={!!tg}
        title={blocking ? t("clinics.blockTitle") : t("clinics.unblockTitle")}
        message={blocking ? t("clinics.blockMsg") : t("clinics.unblockMsg")}
        onCancel={() => setTarget(null)}
        onConfirm={() => {
          setRows(rows.map((r) => (r.id === target ? { ...r, status: r.status === "Active" ? "Blocked" : "Active" } : r)));
          setTarget(null);
        }}
      />
    </div>
  );
}
