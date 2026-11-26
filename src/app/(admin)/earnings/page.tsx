"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleDollarSign, TrendingUp } from "lucide-react";
import { FilterSelect, PageTitle, TableCard, usePaged } from "@/components/ui";
import { earnings } from "@/lib/data";

type Range = "today" | "last24" | "week" | "fortnight" | "month" | "year";
const RANGES: Range[] = ["today", "last24", "week", "fortnight", "month", "year"];
const totals: Record<Range, string> = {
  today: "3,657.50",
  last24: "4,012.00",
  week: "18,240.00",
  fortnight: "33,870.25",
  month: "74,915.25",
  year: "812,430.00",
};

export default function EarningsPage() {
  const { t } = useTranslation();
  const [range, setRange] = useState<Range>("today");
  const { slice, page, pages, setPage } = usePaged(earnings);
  const offset = (page - 1) * 9;
  const options = RANGES.map((r) => ({ value: r, label: t(`ranges.${r}`) }));

  return (
    <div className="space-y-4">
      <PageTitle title={t("earnings.title")} />
      <section className="overflow-hidden rounded-[20px] border border-line bg-panel2">
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="text-[18px] font-semibold">{t("earnings.matrix")}</h2>
          <FilterSelect
            value={range}
            onChange={(v) => v && setRange(v as Range)}
            options={options}
            required
            className="[&_select]:min-w-[150px]"
          />
        </header>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-sky text-navy">
              <CircleDollarSign size={20} />
            </span>
            <div>
              <p className="text-[14px] text-muted">{t("earnings.showing", { range: t(`ranges.${range}`) })}</p>
              <p className="text-[18px] font-semibold" dir="ltr">
                ₪ {totals[range]}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2 text-[13px] text-green-500">
            <TrendingUp size={14} /> <span dir="ltr">5%</span>{" "}
            <span className="hidden text-muted sm:inline">{t("earnings.higher")}</span>
          </span>
        </div>
      </section>

      <TableCard
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            {["common.sl", "earnings.clinic", "earnings.plan", "earnings.txn", "earnings.date", "earnings.amount"].map((h) => (
              <th key={h} className="th">
                {t(h)}
              </th>
            ))}
          </>
        }
      >
        {slice.map((e, i) => (
          <tr key={e.id} className="h-[68px]">
            <td className="td">{String(offset + i + 1).padStart(2, "0")}</td>
            <td className="td text-[15px]">{e.clinic}</td>
            <td className="td">{t(`earnings.${e.plan}`, { defaultValue: e.plan })}</td>
            <td className="td">{e.txn}</td>
            <td className="td">{e.date}</td>
            <td className="td" dir="ltr">
              <span className="inline-block">₪ {e.amount}</span>
            </td>
          </tr>
        ))}
      </TableCard>
    </div>
  );
}
