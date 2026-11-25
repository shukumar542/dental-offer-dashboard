"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Circle, User } from "lucide-react";
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
import { users as seed } from "@/lib/data";

export default function UsersPage() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [target, setTarget] = useState<number | null>(null);

  const filtered = rows.filter(
    (r) => r.name.toLowerCase().includes(q.toLowerCase()) && (!status || r.status === status),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);
  const tg = rows.find((r) => r.id === target);
  const blocking = tg?.status === "Active";

  return (
    <div>
      <PageTitle title={t("users.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <FilterSelect value={status} onChange={(v) => (setStatus(v), setPage(1))} options={["Active", "Blocked"]} />
      </PageTitle>
      <TableCard
        empty={filtered.length === 0}
        paging={{ page, pages, onPage: setPage }}
        head={
          <>
            {["users.name", "common.phone", "common.joinedOn", "common.status"].map((h) => (
              <th key={h} className="th">
                {t(h)}
              </th>
            ))}
            <th className="th text-end">{t("common.actions")}</th>
          </>
        }
      >
        {slice.map((u) => (
          <tr key={u.id}>
            <td className="td">
              <span className="flex items-center gap-3 text-[16px]">
                <Avatar name={u.name} /> {u.name}
              </span>
            </td>
            <td className="td">
              <span dir="ltr" className="inline-block">
                {u.phone}
              </span>
            </td>
            <td className="td">{u.joined}</td>
            <td className="td">
              <StatusBadge status={u.status} />
            </td>
            <td className="td">
              <div className="flex justify-end gap-2">
                <IconBtn label={t("users.viewUser")}>
                  <User size={15} />
                </IconBtn>
                <IconBtn
                  label={u.status === "Active" ? t("users.block") : t("users.unblock")}
                  tone={u.status === "Active" ? "red" : "green"}
                  onClick={() => setTarget(u.id)}
                >
                  {u.status === "Active" ? <Ban size={15} /> : <Circle size={15} />}
                </IconBtn>
              </div>
            </td>
          </tr>
        ))}
      </TableCard>
      <ConfirmModal
        open={!!tg}
        title={blocking ? t("users.blockTitle") : t("users.unblockTitle")}
        message={blocking ? t("users.blockMsg") : t("users.unblockMsg")}
        onCancel={() => setTarget(null)}
        onConfirm={() => {
          setRows(rows.map((r) => (r.id === target ? { ...r, status: r.status === "Active" ? "Blocked" : "Active" } : r)));
          setTarget(null);
        }}
      />
    </div>
  );
}
