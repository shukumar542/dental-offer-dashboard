"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Building2, ClipboardCheck, Headset, LayoutDashboard, TrendingDown, TrendingUp, User } from "lucide-react";
import { Avatar, FilterSelect, StatusBadge, TableCard } from "@/components/ui";
import { users } from "@/lib/data";

const stats = [
  { key: "totalUsers", value: 77, icon: User },
  { key: "totalClinics", value: 112, icon: Building2 },
  { key: "helpSupport", value: 16, icon: Headset },
  { key: "pendingVerification", value: 16, icon: ClipboardCheck },
];

type Range = "today" | "last24" | "week" | "fortnight" | "month" | "year";
const RANGES: Range[] = ["today", "last24", "week", "fortnight", "month", "year"];
const vsKey: Record<Range, string> = {
  today: "vsToday",
  last24: "vsLast24",
  week: "vsWeek",
  fortnight: "vsFortnight",
  month: "vsMonth",
  year: "vsYear",
};
const scale: Record<Range, number> = { today: 1, last24: 1.1, week: 5, fortnight: 9, month: 20, year: 240 };

const base = [
  { key: "newUsers", value: 12, icon: User, delta: 5, up: true },
  { key: "newClinics", value: 8, icon: Building2, delta: 5, up: false },
  { key: "newHelp", value: 2, icon: Headset, delta: 1, up: true },
  { key: "newVerifications", value: 2, icon: ClipboardCheck, delta: 1, up: true },
];
const activity = (r: Range) =>
  base.map((b, i) => ({
    ...b,
    value: String(Math.max(1, Math.round(b.value * scale[r]))).padStart(2, "0"),
    delta: b.delta + (r === "today" ? 0 : i + 1),
    up: r === "today" || r === "last24" ? b.up : (i + RANGES.indexOf(r)) % 3 !== 0,
  }));

export default function DashboardPage() {
  const { t } = useTranslation();
  const [range, setRange] = useState<Range>("today");
  const rangeOptions = RANGES.map((r) => ({ value: r, label: t(`ranges.${r}`) }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[16px] font-medium">
        <LayoutDashboard size={18} /> {t("dashboard.title")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ key, value, icon: Icon }) => (
          <div key={key} className="rounded-[28px] bg-panel p-6">
            <p className="text-[22px] font-semibold text-ink">{t(`dashboard.${key}`)}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[34px] font-bold italic text-ink">{value}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-sky text-navy">
                <Icon size={20} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[20px] border border-line">
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 className="text-[20px] font-semibold">
            {t("dashboard.activityFor", { range: t(`ranges.${range}`) })}
          </h2>
          <FilterSelect
            value={range}
            onChange={(v) => v && setRange(v as Range)}
            options={rangeOptions}
            required
            className="[&_select]:min-w-[150px]"
          />
        </header>
        <ul className="px-4 py-2">
          {activity(range).map(({ key, value, icon: Icon, delta, up }) => (
            <li key={key} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-navy text-white">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="text-[15px] text-muted">{t(`dashboard.${key}`)}</p>
                  <p className="text-[16px] font-semibold">{value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className={`flex items-center gap-1 ${up ? "text-green-500" : "text-red-500"}`}>
                  {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span dir="ltr">{delta}%</span>
                </span>
                <span className="hidden text-muted sm:inline">
                  {t(up ? "dashboard.higher" : "dashboard.lower", { vs: t(`ranges.${vsKey[range]}`) })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between px-2">
          <h2 className="text-[20px] font-semibold">{t("dashboard.recentUsers")}</h2>
          <Link href="/users" className="text-[14px] font-semibold">
            {t("common.viewAll")}
          </Link>
        </div>
        <TableCard
          head={
            <>
              {["dashboard.userName", "dashboard.email", "common.phone", "common.joinedOn", "common.status"].map((h) => (
                <th key={h} className="th">
                  {t(h)}
                </th>
              ))}
              <th className="th text-end">{t("common.actions")}</th>
            </>
          }
        >
          {users.slice(0, 3).map((u) => (
            <tr key={u.id}>
              <td className="td">
                <span className="flex items-center gap-3 text-[16px]">
                  <Avatar name={u.name} /> {u.name}
                </span>
              </td>
              <td className="td">{u.email}</td>
              <td className="td" dir="ltr">
                <span className="inline-block">{u.phone}</span>
              </td>
              <td className="td">{u.joined}</td>
              <td className="td">
                <StatusBadge status={u.status} />
              </td>
              <td className="td">
                <div className="flex justify-end gap-2">
                  <Link
                    href="/users"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white"
                    aria-label={t("common.view")}
                  >
                    <User size={15} />
                  </Link>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      u.status === "Active" ? "bg-bad/10 text-bad" : "bg-ok/10 text-ok"
                    }`}
                  >
                    <Ban size={15} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </TableCard>
      </section>
    </div>
  );
}
