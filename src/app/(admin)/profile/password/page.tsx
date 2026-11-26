"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmModal, Field, PageTitle, Panel } from "@/components/ui";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <PageTitle title={t("profile.title")} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newPwd.length < 8) return setError(t("auth.passMin"));
          if (newPwd !== confirmPwd) return setError(t("auth.passMismatch"));
          setError("");
          setConfirm(true);
        }}
      >
        <Panel title={t("acctX.pwdTitle")} subtitle={t("acctX.pwdSub")}>
          <div className="space-y-4">
            <Field label={t("acctX.oldPwd")}>
              <input required type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} className="input" />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t("acctX.newPwd")}>
                <input required type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="input" />
              </Field>
              <Field label={t("acctX.confirmPwd")}>
                <input required type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="input" />
              </Field>
            </div>
            {error && <p className="text-[13px] text-bad">{error}</p>}
            <button className="btn">{t("acctX.save")}</button>
          </div>
        </Panel>
      </form>
      <ConfirmModal
        open={confirm}
        title={t("acctX.passwordTitle")}
        message={t("acctX.passwordMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          router.push("/profile");
        }}
      />
    </div>
  );
}
