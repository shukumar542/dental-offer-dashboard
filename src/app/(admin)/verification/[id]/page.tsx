"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { useAdminData } from "@/components/AdminData";
import { Avatar, ConfirmModal, PageTitle, Panel, StatusBadge } from "@/components/ui";
import type { KycStatus } from "@/lib/data";

type Action = "approve" | "reject" | "revoke";

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[14px] text-muted">{label}</p>
      <div className="mt-0.5 text-[16px] font-medium text-ink">{children}</div>
    </div>
  );
}

export default function VerificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { clinics, setVerification } = useAdminData();
  const clinic = clinics.find((c) => String(c.id) === id);
  const [action, setAction] = useState<Action | null>(null);
  const [assignTrial, setAssignTrial] = useState(true);

  if (!clinic)
    return (
      <div>
        <PageTitle title={t("kycX.details")} />
        <p className="text-muted">{t("clinicX.notFound")}</p>
      </div>
    );

  const status = clinic.verification;
  const copy: Record<Action, { title: string; msg: string; next: KycStatus }> = {
    approve: { title: t("kycX.approveTitle"), msg: t("kycX.approveMsg"), next: "Verified" },
    reject: { title: t("kycX.rejectTitle"), msg: t("kycX.rejectMsg"), next: "Rejected" },
    revoke: { title: t("kycX.revokeTitle"), msg: t("kycX.revokeMsg"), next: "Rejected" },
  };

  const confirm = () => {
    if (!action) return;
    setVerification(clinic.id, copy[action].next);
    const goTrial = action === "approve" && assignTrial;
    setAction(null);
    router.push(goTrial ? `/clinics/${clinic.id}/subscription` : "/verification");
  };

  return (
    <div className="space-y-5">
      <PageTitle title={t("kycX.details")} />

      <Panel title={t("kycX.clinicInfo")}>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-[14px] text-[#5b6470]">
          <span className="flex min-w-[220px] items-center gap-3 text-[16px]">
            <Avatar name={clinic.name} /> {clinic.name}
          </span>
          <span dir="ltr">{clinic.phone}</span>
          <span>{clinic.address}</span>
          <span>{clinic.joined}</span>
          <StatusBadge status={clinic.status} />
        </div>
      </Panel>

      <Panel title={t("verification.details")}>
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
            <StatusBadge status={status} />
          </Item>
        </div>
      </Panel>

      <div className="flex flex-wrap gap-3">
        {status !== "Verified" && (
          <button className="btn" onClick={() => (setAssignTrial(true), setAction("approve"))}>
            {t("kycX.verify")}
          </button>
        )}
        {status === "Pending" && (
          <button
            className="inline-flex h-[50px] items-center rounded-[10px] bg-bad px-6 font-semibold text-white"
            onClick={() => setAction("reject")}
          >
            {t("kycX.reject")}
          </button>
        )}
        {status === "Verified" && (
          <button
            className="inline-flex h-[50px] items-center rounded-[10px] bg-bad px-6 font-semibold text-white"
            onClick={() => setAction("revoke")}
          >
            {t("kycX.revoke")}
          </button>
        )}
      </div>

      <ConfirmModal
        open={!!action}
        title={action ? copy[action].title : ""}
        message={action ? copy[action].msg : ""}
        onCancel={() => setAction(null)}
        onConfirm={confirm}
      >
        {action === "approve" && (
          <div role="radiogroup" className="mt-5 grid grid-cols-2 gap-2 rounded-[12px] bg-panel p-1">
            {[
              { v: true, label: t("kycX.yesTrial") },
              { v: false, label: t("kycX.noTrial") },
            ].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                role="radio"
                aria-checked={assignTrial === o.v}
                onClick={() => setAssignTrial(o.v)}
                className={`rounded-[10px] px-3 py-3 text-[14px] font-medium transition ${
                  assignTrial === o.v ? "bg-white text-navy shadow-sm" : "text-muted"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </ConfirmModal>
    </div>
  );
}
