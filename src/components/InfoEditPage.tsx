"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Panel, PageTitle } from "./ui";

/** `label`/`value` may be i18n keys (value only when `valueKey` is set); `key` is the stable id. */
export type InfoField = { key: string; label: string; value: string; valueKey?: boolean };

/** Read-only info grid that flips to inputs when "Update" is pressed. */
export default function InfoEditPage({
  title,
  panelTitle,
  fields,
  updateLabel,
  extra,
  header,
}: {
  title: string;
  panelTitle: string;
  fields: InfoField[];
  updateLabel: string;
  extra?: React.ReactNode;
  header?: React.ReactNode;
}) {
  const { t } = useTranslation();
  // Keep user edits keyed by field; untouched fields follow the active language.
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const valueOf = (f: InfoField) => edits[f.key] ?? (f.valueKey ? t(f.value) : f.value);

  return (
    <div className="space-y-4">
      <PageTitle title={title} />
      {header}
      <Panel title={panelTitle}>
        <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <dt className="text-[14px] text-muted">{f.label}</dt>
              <dd>
                {editing ? (
                  <input
                    value={valueOf(f)}
                    onChange={(e) => setEdits({ ...edits, [f.key]: e.target.value })}
                    className="input mt-1 h-11"
                  />
                ) : (
                  <span className="text-[17px] font-medium">{valueOf(f)}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>
      <div className="flex flex-wrap gap-3">
        <button className="btn" onClick={() => setEditing(!editing)}>
          {editing ? t("common.saveChanges") : updateLabel}
        </button>
        {extra}
      </div>
    </div>
  );
}
