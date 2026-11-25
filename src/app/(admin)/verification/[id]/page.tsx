"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { ConfirmModal, InfoGrid, PageTitle, Panel, StatusBadge } from "@/components/ui";
import { kyc } from "@/lib/data";

export default function VerificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const item = kyc.find((k) => String(k.id) === id) ?? kyc[0];
  const [status, setStatus] = useState<string>(item.status);
  const [action, setAction] = useState<"Verified" | "Rejected" | null>(null);
  const approving = action === "Verified";

  return (
    <div>
      <PageTitle title={t("verification.details")} />
      <Panel title={item.clinic} subtitle={t("verification.detailsSub")}>
        <div className="space-y-6">
          <InfoGrid
            items={[
              [t("clinics.clinicName"), item.clinic],
              [t("verification.verificationType"), t(`kycType.${item.type}`, { defaultValue: item.type })],
              [t("clinics.regNumber"), item.regNumber],
              [t("verification.requested"), item.requested],
              [t("common.phone"), item.phone],
              [t("verification.email"), item.email],
            ]}
          />
          <div>
            <p className="text-[14px] text-muted">{t("verification.current")}</p>
            <StatusBadge status={status} />
          </div>
          <div className="flex h-40 w-full max-w-[420px] items-center justify-center gap-3 rounded-[16px] border border-dashed border-muted/40 bg-white text-muted">
            <FileText /> {t("verification.docPreview")}
          </div>
          {status === "Pending" && (
            <div className="flex gap-3">
              <button className="btn" onClick={() => setAction("Verified")}>
                {t("verification.approve")}
              </button>
              <button
                className="inline-flex h-[50px] items-center rounded-[10px] bg-bad/10 px-6 font-semibold text-bad"
                onClick={() => setAction("Rejected")}
              >
                {t("verification.reject")}
              </button>
            </div>
          )}
        </div>
      </Panel>
      <ConfirmModal
        open={!!action}
        title={approving ? t("verification.approveTitle") : t("verification.rejectTitle")}
        message={approving ? t("verification.approveMsg") : t("verification.rejectMsg")}
        onCancel={() => setAction(null)}
        onConfirm={() => {
          setStatus(action!);
          setAction(null);
          router.push("/verification");
        }}
      />
    </div>
  );
}
