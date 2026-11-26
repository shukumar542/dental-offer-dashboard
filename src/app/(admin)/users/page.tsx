"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Circle, User } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
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

export default function UsersPage() {
  const { t } = useTranslation();
  const { users, toggleUser } = useAdminData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [target, setTarget] = useState<number | null>(null);

  const filtered = users.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) && (!status || status === "all" || r.status === status),
  );
  const { slice, page, pages, setPage } = usePaged(filtered);
  const tg = users.find((r) => r.id === target);
  const blocking = tg?.status === "Active";

  return (
    <div>
      <PageTitle title={t("users.title")}>
        <SearchBox value={q} onChange={(v) => (setQ(v), setPage(1))} />
        <FilterSelect
          value={status}
          onChange={(v) => (setStatus(v), setPage(1))}
          options={[
            { value: "all", label: t("userX.allUsers") },
            { value: "Active", label: t("userX.activeUsers") },
            { value: "Blocked", label: t("userX.blockedUsers") },
          ]}
        />
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
                <Link
                  href={`/users/${u.id}`}
                  aria-label={t("users.viewUser")}
                  title={t("users.viewUser")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white hover:opacity-80"
                >
                  <User size={15} />
                </Link>
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
          if (target !== null) toggleUser(target);
          setTarget(null);
        }}
      />
    </div>
  );
}
