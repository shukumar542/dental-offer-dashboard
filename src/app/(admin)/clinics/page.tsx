"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Circle, Eye, Plus, SlidersHorizontal } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import {
  Avatar,
  ConfirmModal,
  IconBtn,
  Modal,
  PageTitle,
  SearchBox,
  StatusBadge,
  TableCard,
  usePaged,
} from "@/components/ui";

type Filters = { account: string; source: string; verification: string };
const NONE: Filters = { account: "all", source: "all", verification: "all" };

function Chips({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-[12px] bg-panel p-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-[8px] px-3 py-2 text-[12px] font-medium transition ${
            value === o.value ? "bg-navy text-white" : "text-muted hover:bg-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ClinicsPage() {
  const { t } = useTranslation();
  const { clinics, toggleClinic } = useAdminData();
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Filters>(NONE);
  const [draft, setDraft] = useState<Filters>(NONE);
  const [showFilter, setShowFilter] = useState(false);
  const [target, setTarget] = useState<number | null>(null);

  const filtered = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) &&
      (filters.account === "all" || c.status === filters.account) &&
      (filters.source === "all" || c.source === filters.source) &&
      (filters.verification === "all" || c.verification === filters.verification),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);
  const tg = clinics.find((r) => r.id === target);
  const blocking = tg?.status === "Active";
  const active = JSON.stringify(filters) !== JSON.stringify(NONE);

  return (
    <div>
      <PageTitle title={t("clinics.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <button
          onClick={() => {
            setDraft(filters);
            setShowFilter(true);
          }}
          aria-label={t("clinics.filters")}
          className="relative flex h-11 w-11 items-center justify-center rounded-[10px] bg-navy text-white"
        >
          <SlidersHorizontal size={18} />
          {active && <span className="absolute -end-1 -top-1 h-3 w-3 rounded-full bg-gold" />}
        </button>
        <Link href="/clinics/new" className="flex h-11 items-center gap-2 rounded-[10px] bg-navy px-5 text-[15px] font-medium text-white">
          <Plus size={16} /> {t("clinics.add")}
        </Link>
      </PageTitle>

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
                  href={`/clinics/${c.id}`}
                  aria-label={t("clinicX.details")}
                  title={t("clinicX.details")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white hover:opacity-80"
                >
                  <Eye size={15} />
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
          if (target !== null) toggleClinic(target);
          setTarget(null);
        }}
      />

      <Modal open={showFilter} title={t("clinicX.filterTitle")} onClose={() => setShowFilter(false)}>
        <p className="-mt-3 mb-5 text-[13px] text-muted">{t("clinicX.filterSub")}</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[15px] font-medium">{t("clinicX.acctStatus")}</p>
            <Chips
              value={draft.account}
              onChange={(account) => setDraft({ ...draft, account })}
              options={[
                { value: "all", label: t("clinicX.allClinics") },
                { value: "Active", label: t("clinicX.activeClinics") },
                { value: "Blocked", label: t("clinicX.blockedClinics") },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-[15px] font-medium">{t("clinicX.regSource")}</p>
            <Chips
              value={draft.source}
              onChange={(source) => setDraft({ ...draft, source })}
              options={[
                { value: "all", label: t("clinicX.allClinics") },
                { value: "Admin Added", label: t("clinicX.adminAdded") },
                { value: "Self-Registered", label: t("clinicX.selfRegistered") },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-[15px] font-medium">{t("clinicX.verStatus")}</p>
            <Chips
              value={draft.verification}
              onChange={(verification) => setDraft({ ...draft, verification })}
              options={[
                { value: "all", label: t("clinicX.allClinics") },
                { value: "Pending", label: t("clinicX.pendingClinics") },
                { value: "Verified", label: t("clinicX.verifiedClinics") },
                { value: "Rejected", label: t("clinicX.rejectedClinics") },
              ]}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setDraft(NONE);
              setFilters(NONE);
              setPage(1);
              setShowFilter(false);
            }}
            className="h-12 rounded-[10px] bg-panel font-medium text-muted"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={() => {
              setFilters(draft);
              setPage(1);
              setShowFilter(false);
            }}
            className="h-12 rounded-[10px] bg-navy font-medium text-white"
          >
            {t("clinicX.apply")}
          </button>
        </div>
      </Modal>
    </div>
  );
}
