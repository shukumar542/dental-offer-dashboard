import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Heebo, Plus_Jakarta_Sans } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import { LANG_COOKIE, normalizeLang } from "@/i18n";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const heebo = Heebo({ variable: "--font-heebo", subsets: ["hebrew", "latin"] });

export const metadata: Metadata = {
  title: "DentalOffers Admin",
  description: "DentalOffers admin dashboard",
};

async function LangShell({ children }: { children: React.ReactNode }) {
  const lang = normalizeLang((await cookies()).get(LANG_COOKIE)?.value);
  return <I18nProvider initialLang={lang}>{children}</I18nProvider>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${jakarta.variable} ${heebo.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Suspense fallback={null}>
          <LangShell>{children}</LangShell>
        </Suspense>
      </body>
    </html>
  );
}
