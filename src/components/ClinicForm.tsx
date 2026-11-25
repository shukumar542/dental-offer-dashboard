"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Camera, ChevronDown, ImagePlus } from "lucide-react";
import { Field, Panel } from "@/components/ui";
import { categories, treatmentServices } from "@/lib/data";

type Defaults = {
  name?: string;
  phone?: string;
  address?: string;
  services?: string[];
};

function Select({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select name={name} defaultValue="" className="input appearance-none pe-10 text-muted">
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

export default function ClinicForm({ mode, defaults = {} }: { mode: "add" | "edit"; defaults?: Defaults }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [services, setServices] = useState<string[]>(defaults.services ?? []);
  const [svcInput, setSvcInput] = useState("");
  const [fileName, setFileName] = useState("");
  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const addService = (v: string) => {
    const s = v.trim();
    if (s && !services.includes(s)) setServices((cur) => [...cur, s]);
    setSvcInput("");
  };
  const add = mode === "add";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/clinics");
      }}
    >
      <Panel
        title={add ? t("clinics.addTitle") : t("clinics.updateTitle")}
        subtitle={add ? t("clinics.addSub") : t("clinics.updateSub")}
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
              <input required defaultValue={defaults.name} className="input" placeholder={t("clinics.clinicNamePh")} />
            </Field>
            <Field label={t("clinics.phone")}>
              <input required defaultValue={defaults.phone} className="input" placeholder={t("clinics.phonePh")} />
            </Field>
            {add && (
              <>
                <Field label={t("clinics.password")}>
                  <input required type="password" minLength={8} className="input" placeholder={t("clinics.passwordPh")} />
                </Field>
                <Field label={t("clinics.confirmPassword")}>
                  <input required type="password" minLength={8} className="input" placeholder={t("clinics.confirmPasswordPh")} />
                </Field>
              </>
            )}
          </div>

          <Field label={t("clinics.address")}>
            <input required defaultValue={defaults.address} className="input" placeholder={t("clinics.addressPh")} />
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
              {Array.from(new Set([...treatmentServices, ...categories])).map((s) => (
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
              className="min-h-[110px] w-full rounded-[10px] bg-[#ebecee] p-4 text-[15px] outline-none placeholder:text-muted focus:ring-2 focus:ring-navy/30"
              placeholder={t("clinics.aboutPh")}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("clinics.regType")}>
              <Select
                name="regType"
                placeholder={t("clinics.regTypePh")}
                options={["Dental Clinic License", "Dentist Professional License", "Other / Not Listed"].map((v) => ({
                  value: v,
                  label: t(`kycType.${v}`),
                }))}
              />
            </Field>
            <Field label={t("clinics.regNumber")}>
              <input className="input" placeholder={t("clinics.regNumberPh")} />
            </Field>
            <Field label={t("clinics.regDoc")}>
              <span className="input flex cursor-pointer items-center justify-center gap-2 text-[12px] text-muted">
                <ImagePlus size={16} />
                {fileName || t("clinics.regDocPh")}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </span>
            </Field>
            <Field label={t("clinics.verStatus")}>
              <Select
                name="status"
                placeholder={t("clinics.verStatusPh")}
                options={["Pending", "Verified", "Rejected"].map((v) => ({ value: v, label: t(`status.${v}`) }))}
              />
            </Field>
          </div>

          <button className="btn">{add ? t("clinics.saveContinue") : t("clinics.updateBtn")}</button>
        </div>
      </Panel>
    </form>
  );
}
