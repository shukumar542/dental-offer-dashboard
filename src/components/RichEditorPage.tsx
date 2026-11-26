"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { ConfirmModal, PageTitle } from "./ui";

const tools: { icon: typeof Bold; cmd: string; arg?: string; label: string }[] = [
  { icon: Undo2, cmd: "undo", label: "undo" },
  { icon: Redo2, cmd: "redo", label: "redo" },
  { icon: Bold, cmd: "bold", label: "bold" },
  { icon: Italic, cmd: "italic", label: "italic" },
  { icon: Underline, cmd: "underline", label: "underline" },
  { icon: Strikethrough, cmd: "strikeThrough", label: "strike" },
  { icon: List, cmd: "insertUnorderedList", label: "bullets" },
  { icon: ListOrdered, cmd: "insertOrderedList", label: "numbers" },
  { icon: Quote, cmd: "formatBlock", arg: "blockquote", label: "quote" },
  { icon: Minus, cmd: "insertHorizontalRule", label: "divider" },
];

/** `doc` is "terms" or "privacy": its title and HTML body come from the active locale. */
export default function RichEditorPage({ doc }: { doc: "terms" | "privacy" }) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // Load the policy text in the active language (re-runs when the language switches).
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = t(`${doc}.html`);
    setSaved(false);
  }, [t, doc, i18n.resolvedLanguage]);

  const run = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
  };

  return (
    <div>
      <PageTitle title={t(`${doc}.title`)} />
      <div className="overflow-hidden rounded-[20px] border border-line">
        <div className="flex flex-wrap items-center gap-1 bg-sky px-4 py-3">
          <select
            aria-label={t("editor.textStyle")}
            onChange={(e) => run("formatBlock", e.target.value)}
            className="me-3 rounded-md bg-transparent px-2 py-1 text-[14px] outline-none"
          >
            <option value="p">{t("editor.normal")}</option>
            <option value="h2">{t("editor.h1")}</option>
            <option value="h3">{t("editor.h2")}</option>
            <option value="h4">{t("editor.h3")}</option>
          </select>
          {tools.map(({ icon: Icon, cmd, arg, label }) => (
            <button
              key={label}
              type="button"
              aria-label={t(`editor.${label}`)}
              title={t(`editor.${label}`)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => run(cmd, arg)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-ink hover:bg-white/60"
            >
              <Icon size={16} />
            </button>
          ))}
          <button
            type="button"
            aria-label={t("editor.link")}
            title={t("editor.link")}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = window.prompt(t("editor.linkUrl"));
              if (url) run("createLink", url);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/60"
          >
            <Link2 size={16} />
          </button>
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={() => setSaved(false)}
          className="rich min-h-[420px] bg-white p-4 outline-none"
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button className="btn" onClick={() => setConfirm(true)}>
          {t("common.saveChanges")}
        </button>
        {saved && <span className="text-[14px] text-ok">{t("common.changesSaved")}</span>}
      </div>
      <ConfirmModal
        open={confirm}
        title={t(`acctX.${doc}Title`)}
        message={t(`acctX.${doc}Msg`)}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          setSaved(true);
        }}
      />
    </div>
  );
}
