"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Eye, FileText, Pencil, RefreshCw, Star, UserCheck } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { Avatar, ConfirmModal, Modal, PageTitle, Panel, StatusBadge } from "@/components/ui";

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[14px] text-muted">{label}</p>
      <div className="mt-0.5 text-[17px] font-medium text-ink">{children}</div>
    </div>
  );
}

export default function ClinicDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { clinics, toggleClinic } = useAdminData();
  const [confirm, setConfirm] = useState(false);
  const [dentistsOpen, setDentistsOpen] = useState(false);
  const clinic = clinics.find((c) => String(c.id) === id);

  if (!clinic)
    return (
      <div>
        <PageTitle title={t("clinicX.details")} />
        <p className="text-muted">{t("clinicX.notFound")}</p>
      </div>
    );

  const blocking = clinic.status === "Active";
  const sub = clinic.subscription;

  return (
    <div className="space-y-5">
      <PageTitle title={t("clinicX.details")} />

      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[24px] border border-line bg-white">
        <Avatar name={clinic.name} size={64} />
      </div>

      <Panel title={t("clinicX.info")}>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          <Item label={t("clinicX.name")}>{clinic.name}</Item>
          <Item label={t("clinicX.phone")}>
            <span dir="ltr" className="inline-block">
              {clinic.phone}
            </span>
          </Item>
          <Item label={t("clinicX.address")}>{clinic.address}</Item>
          <Item label={t("clinicX.services")}>
            <div className="flex flex-wrap gap-2 pt-1">
              {clinic.services.map((s) => (
                <span key={s} className="rounded-full bg-sky px-3 py-1 text-[12px] font-medium text-ink">
                  {s}
                </span>
              ))}
            </div>
          </Item>
          <div className="flex items-start justify-between gap-3">
            <Item label={t("clinicX.dentists")}>{t("clinicX.dentistsCount", { count: clinic.dentists.length })}</Item>
            <button
              onClick={() => setDentistsOpen(true)}
              aria-label={t("clinicX.viewDentists")}
              title={t("clinicX.viewDentists")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-navy hover:opacity-80"
            >
              <Eye size={15} />
            </button>
          </div>
          <Item label={t("clinicX.subscription")}>
            <div className="flex flex-wrap items-center gap-3">
              {sub ? (
                <span>
                  {t("clinicX.planName", { plan: t(`clinicX.plans.${sub.plan}`) })}{" "}
                  <span className="text-[12px] font-normal text-muted">
                    ({t("clinicX.expires", { date: sub.expires })})
                  </span>
                </span>
              ) : (
                <span className="text-muted">{t("clinicX.noSubscription")}</span>
              )}
              <Link
                href={`/clinics/${clinic.id}/subscription`}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-sky px-3 text-[12px] font-semibold text-navy hover:opacity-80"
              >
                <RefreshCw size={13} /> {t("clinicX.updateSub")}
              </Link>
            </div>
          </Item>
          <Item label={t("clinicX.joined")}>{clinic.joined}</Item>
          <Item label={t("clinicX.ratings")}>
            <span className="inline-flex items-center gap-1.5" dir="ltr">
              <Star size={16} className="fill-[#f59e0b] text-[#f59e0b]" /> {clinic.rating.toFixed(1)}/5.0
            </span>
          </Item>
          <Item label={t("clinicX.status")}>
            <StatusBadge status={clinic.status} />
          </Item>
        </div>
        <div className="mt-6">
          <Item label={t("clinicX.about")}>{clinic.about}</Item>
        </div>
      </Panel>

      <Panel title={t("clinicX.verifDetails")}>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          <Item label={t("clinicX.regType")}>{t(`kycType.${clinic.regType}`, { defaultValue: clinic.regType })}</Item>
          <Item label={t("clinicX.regNumber")}>
            <span dir="ltr" className="inline-block">
              {clinic.regNumber}
            </span>
          </Item>
          <Item label={t("clinicX.document")}>
            <div className="flex gap-3 pt-1">
              {clinic.docs.map((d) => (
                <span
                  key={d}
                  title={d}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-white text-muted"
                >
                  <FileText size={20} />
                </span>
              ))}
            </div>
          </Item>
          <Item label={t("clinicX.submitted")}>{clinic.submitted}</Item>
          <Item label={t("clinicX.status")}>
            <StatusBadge status={clinic.verification} />
          </Item>
        </div>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setConfirm(true)}
          className={`inline-flex h-[50px] items-center gap-2 rounded-[10px] px-6 font-semibold text-white ${
            blocking ? "bg-bad" : "bg-navy"
          }`}
        >
          {blocking ? <Ban size={18} /> : <UserCheck size={18} />}
          {blocking ? t("clinicX.blockBtn") : t("clinicX.unblockBtn")}
        </button>
        <Link href={`/clinics/${clinic.id}/edit`} className="btn">
          <Pencil size={16} /> {t("clinicX.updateBtn")}
        </Link>
      </div>

      <ConfirmModal
        open={confirm}
        title={blocking ? t("clinics.blockTitle") : t("clinics.unblockTitle")}
        message={blocking ? t("clinics.blockMsg") : t("clinics.unblockMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          toggleClinic(clinic.id);
          setConfirm(false);
        }}
      />

      <Modal open={dentistsOpen} title={t("clinicX.dentistsTitle")} onClose={() => setDentistsOpen(false)}>
        <ul className="space-y-3">
          {clinic.dentists.map((d) => (
            <li key={d} className="flex items-center gap-3 rounded-[12px] bg-panel p-3">
              <Avatar name={d.replace("Dr. ", "")} />
              <span className="font-medium">{d}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => setDentistsOpen(false)} className="btn mt-5 w-full">
          {t("common.cancel")}
        </button>
      </Modal>
    </div>
  );
}
