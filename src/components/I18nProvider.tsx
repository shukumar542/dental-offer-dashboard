"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n, dirOf, LANG_COOKIE, type Lang } from "@/i18n";

/**
 * `initialLang` comes from the cookie on the server, so server HTML and the first client
 * render use the same language (no hydration mismatch). Switching updates the cookie.
 */
export default function I18nProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [i18n] = useState(() => createI18n(initialLang));
  const [lng, setLng] = useState<string>(initialLang);

  useEffect(() => {
    const onChange = (next: string) => {
      setLng(next);
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    };
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

  // Mirror onto <html> (scrollbars, native widgets, assistive tech).
  useEffect(() => {
    document.documentElement.lang = lng;
    document.documentElement.dir = dirOf(lng);
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      <div dir={dirOf(lng)} lang={lng} className="contents">
        {children}
      </div>
    </I18nextProvider>
  );
}
