"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Camera, ChevronDown, FileText, ImagePlus } from "lucide-react";
import { useAdminData } from "./AdminData";
import { ConfirmModal, Field, Panel } from "./ui";
import { treatmentServices, type Clinic, type KycStatus } from "@/lib/data";

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input appearance-none pe-10 ${value ? "text-ink" : "text-muted"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute end-4 top-[17px] text-muted" />
    </div>
  );
}

const REG_TYPES = ["Dental Clinic License", "Dentist Professional License", "Other / Not Listed"];

export default function ClinicForm({ mode, clinic }: { mode: "add" | "edit"; clinic?: Clinic }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { categories, addClinic, updateClinic } = useAdminData();
  const add = mode === "add";

  const [name, setName] = useState(clinic?.name ?? "");
  const [phone, setPhone] = useState(clinic?.phone ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(clinic?.address ?? "");
  const [services, setServices] = useState<string[]>(clinic?.services ?? []);
  const [svcInput, setSvcInput] = useState("");
  const [about, setAbout] = useState(clinic?.about ?? "");
  const [regType, setRegType] = useState(clinic?.regType ?? "");
  const [regNumber, setRegNumber] = useState(clinic?.regNumber ?? "");
  const [fileName, setFileName] = useState(clinic?.docs[0] ?? "");
  const [verification, setVerification] = useState<string>(clinic?.verification ?? "");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const addService = (v: string) => {
    const s = v.trim();
    if (s && !services.includes(s)) setServices((cur) => [...cur, s]);
    setSvcInput("");
  };

  const suggestions = Array.from(new Set([...treatmentServices, ...categories.map((c) => c.name)]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (add || password || confirmPassword) {
      if (password.length < 8) return setError(t("auth.passMin"));
      if (password !== confirmPassword) return setError(t("auth.passMismatch"));
    }
    setError("");
    setConfirm(true);
  };

  const save = () => {
    const base = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      services,
      about: about.trim(),
      regType,
      regNumber: regNumber.trim(),
      verification: (verification || "Pending") as KycStatus,
      docs: fileName ? [fileName] : [],
    };
    setConfirm(false);
    if (add) {
      const id = addClinic({
        ...base,
        joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        status: "Active",
        dentists: [],
        subscription: null,
        rating: 0,
        submitted: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        source: "Admin Added",
      });
      router.push(`/clinics/${id}/subscription`);
    } else if (clinic) {
      updateClinic(clinic.id, base);
      router.push(`/clinics/${clinic.id}`);
    }
  };

  return (
    <form onSubmit={submit}>
      <Panel
        title={add ? t("clinics.addTitle") : t("clinics.updateTitle")}
        subtitle={add ? t("clinics.addSub") : t("clinicX.updateSubtitle")}
      >
        <div className="space-y-4">
          <label className="relative flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[20px] bg-[#ebecee] text-center text-[10px] text-muted">
            <ImagePlus size={22} />
            {t("clinics.logo")}
            <input type="file" accept="image/*" className="hidden" />
            <span className="absolute bottom-1 end-1 flex h-5 w-5 items-center justify-center rounded bg-navy text-white">
              <Camera size={11} />
            </span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("clinics.clinicName")}>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder={t("clinics.clinicNamePh")} />
            </Field>
            <Field label={t("clinics.phone")}>
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" placeholder={t("clinics.phonePh")} />
            </Field>
            <Field label={t("clinics.password")}>
              <input
                required={add}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder={t("clinics.passwordPh")}
              />
            </Field>
            <Field label={t("clinics.confirmPassword")}>
              <input
                required={add}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder={t("clinics.confirmPasswordPh")}
              />
            </Field>
          </div>

          <Field label={t("clinics.address")}>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} className="input" placeholder={t("clinics.addressPh")} />
          </Field>

          <div>
            <span className="mb-2 block text-[15px] font-medium">
              {t("clinics.services")}{" "}
              <span className="text-[12px] font-normal text-muted">({t("clinics.multiple")})</span>
            </span>
            <input
              list="service-options"
              value={svcInput}
              onChange={(e) => setSvcInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addService(svcInput);
                }
              }}
              onBlur={() => addService(svcInput)}
              className="input"
              placeholder={t("clinics.servicesPh")}
            />
            <datalist id="service-options">
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
            {services.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggle(s)}
                    title={t("clinics.remove")}
                    className="rounded-full bg-navy px-3 py-1 text-[12px] font-medium text-white"
                  >
                    {s} ✕
                  </button>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {treatmentServices
                .filter((s) => !services.includes(s))
                .map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggle(s)}
                    className="rounded-full bg-sky px-3 py-1 text-[12px] font-medium text-ink"
                  >
                    + {s}
                  </button>
                ))}
            </div>
          </div>

          <Field label={t("clinics.about")}>
            <textarea
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="min-h-[110px] w-full rounded-[10px] bg-[#ebecee] p-4 text-[15px] outline-none placeholder:text-muted focus:ring-2 focus:ring-navy/30"
              placeholder={t("clinics.aboutPh")}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("clinics.regType")}>
              <Select
                value={regType}
                onChange={setRegType}
                placeholder={t("clinics.regTypePh")}
                options={REG_TYPES.map((v) => ({ value: v, label: t(`kycType.${v}`) }))}
              />
            </Field>
            <Field label={t("clinics.regNumber")}>
              <input value={regNumber} onChange={(e) => setRegNumber(e.target.value)} className="input" placeholder={t("clinics.regNumberPh")} />
            </Field>
            <Field label={t("clinics.regDoc")}>
              <span className="input flex cursor-pointer items-center justify-center gap-2 text-[12px] text-muted">
                {fileName ? <FileText size={16} /> : <ImagePlus size={16} />}
                {fileName || t("clinics.regDocPh")}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? fileName)}
                />
              </span>
            </Field>
            <Field label={t("clinics.verStatus")}>
              <Select
                value={verification}
                onChange={setVerification}
                placeholder={t("clinics.verStatusPh")}
                options={["Pending", "Verified", "Rejected"].map((v) => ({ value: v, label: t(`status.${v}`) }))}
              />
            </Field>
          </div>

          {error && <p className="text-[13px] text-bad">{error}</p>}
          <button className="btn">{add ? t("clinics.saveContinue") : t("clinicX.saveChanges")}</button>
        </div>
      </Panel>

      <ConfirmModal
        open={confirm}
        title={add ? t("clinicX.addConfirmTitle") : t("clinicX.updConfirmTitle")}
        message={add ? t("clinicX.addConfirmMsg") : t("clinicX.updConfirmMsg")}
        onCancel={() => setConfirm(false)}
        onConfirm={save}
      />
    </form>
  );
}
