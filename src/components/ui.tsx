"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  Search,
  TriangleAlert,
} from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 4c-2.2 0-4 1.6-4 4 0 2 .9 3.2 1.4 5 .4 1.6.6 4.5 1.6 6 .7 1 1.7.7 2-.5.3-1.3.5-3.3 2-3.3s1.7 2 2 3.3c.3 1.2 1.3 1.5 2 .5 1-1.5 1.2-4.4 1.6-6C18.1 11.2 19 10 19 8c0-2.4-1.8-4-4-4-1.2 0-2 .5-4 .5S8.2 4 7 4Z"
          stroke="#082238"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M2 10c5 2.5 13 1 20-2" stroke="#c5a05e" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="text-[26px] font-bold tracking-tight text-navy">
        Dental<span className="text-gold">Offers</span>
      </span>
    </div>
  );
}

export function PageTitle({
  title,
  back = true,
  children,
}: {
  title: string;
  back?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="mb-4 flex min-h-[44px] flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[16px] font-medium text-ink">
        {back && (
          <button onClick={() => router.back()} aria-label={t("common.back")}>
            <CircleChevronLeft size={20} strokeWidth={1.6} className="rtl:-scale-x-100" />
          </button>
        )}
        {title}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

const badgeStyles: Record<string, string> = {
  Active: "bg-ok/15 text-ok",
  Verified: "bg-ok/15 text-ok",
  Resolved: "bg-ok/15 text-ok",
  Blocked: "bg-bad/15 text-bad",
  Rejected: "bg-bad/15 text-bad",
  Pending: "bg-warn/20 text-warn",
  "To Do": "bg-warn/20 text-warn",
};

export function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium ${badgeStyles[status] ?? ""}`}
    >
      <span className="text-[8px]">●</span>
      {t(`status.${status}`, { defaultValue: status })}
    </span>
  );
}

const avatarColors = ["#bfe3dc", "#f6cfd0", "#c9dff5", "#e6d9c2", "#d9d3f0"];
export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const color = avatarColors[(name.charCodeAt(0) + name.length) % avatarColors.length];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-navy"
      style={{ width: size, height: size, background: color }}
    >
      {initials}
    </span>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  return (
    <label className="flex h-10 w-full min-w-[220px] items-center gap-2 rounded-[10px] bg-panel px-4 text-muted sm:w-[280px]">
      <Search size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t("common.searchByName")}
        className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
      />
    </label>
  );
}

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
  placeholder?: string;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full min-w-[200px] appearance-none rounded-[10px] bg-panel px-4 pe-10 text-[14px] text-muted outline-none"
      >
        <option value="">{placeholder ?? t("common.filterByStatus")}</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const label = typeof o === "string" ? t(`status.${o}`, { defaultValue: o }) : o.label;
          return (
            <option key={v} value={v}>
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute end-3 top-3 text-muted" />
    </div>
  );
}

export const PAGE_SIZE = 9;

export function usePaged<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pages);
  const slice = useMemo(
    () => items.slice((current - 1) * pageSize, current * pageSize),
    [items, current, pageSize],
  );
  return { slice, page: current, pages, setPage };
}

export function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
}) {
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-md border border-navy text-[13px] disabled:opacity-40";
  return (
    <div className="flex items-center justify-center gap-2 bg-sky py-2">
      <button className={`${btn} bg-navy text-white`} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        <ChevronLeft size={16} className="rtl:rotate-180" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`${btn} ${p === page ? "bg-white text-ink" : "border-transparent text-ink"}`}
        >
          {p}
        </button>
      ))}
      <button className={`${btn} bg-navy text-white`} disabled={page >= pages} onClick={() => onPage(page + 1)}>
        <ChevronRight size={16} className="rtl:rotate-180" />
      </button>
    </div>
  );
}

/** Rounded table card with sky header + pagination footer. */
export function TableCard({
  head,
  children,
  paging,
  empty,
}: {
  head: React.ReactNode;
  children: React.ReactNode;
  paging?: { page: number; pages: number; onPage: (p: number) => void };
  empty?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="bg-sky">
            <tr>{head}</tr>
          </thead>
          <tbody className="divide-y divide-line">{children}</tbody>
        </table>
        {empty && <p className="py-10 text-center text-[14px] text-muted">{t("common.noResults")}</p>}
      </div>
      {paging && <Pagination {...paging} />}
    </div>
  );
}

export function IconBtn({
  children,
  tone = "navy",
  onClick,
  label,
}: {
  children: React.ReactNode;
  tone?: "navy" | "sky" | "red" | "green";
  onClick?: () => void;
  label: string;
}) {
  const tones = {
    navy: "bg-navy text-white",
    sky: "bg-sky text-navy",
    red: "bg-bad/10 text-bad",
    green: "bg-ok/10 text-ok",
  };
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition hover:opacity-80 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[500px] rounded-[24px] bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f59e0b] text-white">
          <TriangleAlert size={28} />
        </div>
        <h3 className="text-[22px] font-bold text-ink">{title}</h3>
        <p className="mx-auto mt-3 max-w-[400px] text-[14px] text-muted">{message}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="h-12 rounded-[10px] bg-panel font-medium text-muted">
            {t("common.cancel")}
          </button>
          <button onClick={onConfirm} className="h-12 rounded-[10px] bg-navy font-medium text-white">
            {confirmLabel ?? t("common.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-[520px] rounded-[24px] bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-5 text-[20px] font-bold text-ink">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[15px] font-medium text-ink">
        {label} {hint && <span className="text-[12px] font-normal text-muted">({hint})</span>}
      </span>
      {children}
    </label>
  );
}

export function InfoGrid({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[14px] text-muted">{k}</dt>
          <dd className="text-[16px] font-medium text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-line bg-panel2">
      <header className="border-b border-line px-4 py-3">
        <h2 className="text-[20px] font-semibold text-ink">{title}</h2>
        {subtitle && <p className="text-[14px] text-muted">{subtitle}</p>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
