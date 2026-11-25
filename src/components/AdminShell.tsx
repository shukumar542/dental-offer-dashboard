"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bell,
  Building,
  Building2,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  Headset,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  ShieldCheck,
  Smile,
  User,
  UserCog,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Logo } from "./ui";

const nav = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/users", key: "users", icon: User },
  { href: "/clinics", key: "clinics", icon: Building2 },
  { href: "/treatment-category", key: "treatmentCategory", icon: Smile },
  { href: "/verification", key: "verification", icon: ClipboardCheck },
  { href: "/earnings", key: "earnings", icon: CircleDollarSign },
  { href: "/help-support", key: "helpSupport", icon: Headset },
  { href: "/faq", key: "faq", icon: CircleHelp },
  { href: "/terms", key: "terms", icon: ShieldCheck },
  { href: "/privacy", key: "privacy", icon: FileCheck2 },
  { href: "/legal", key: "legal", icon: Building },
  { href: "/profile", key: "profile", icon: UserCog },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <aside className="flex h-full w-[260px] flex-col border-e border-line bg-white p-6">
      <Link href="/dashboard" className="mb-6 flex h-[72px] items-center justify-center rounded-[16px] bg-panel" dir="ltr">
        <Logo />
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {nav.map(({ href, key, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex h-12 items-center gap-3 rounded-[10px] px-4 text-[15px] font-medium transition ${
                active ? "bg-navy text-white" : "text-ink hover:bg-panel"
              }`}
            >
              <Icon size={20} strokeWidth={1.7} />
              {t(`nav.${key}`)}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => router.push("/login")}
        className="mt-4 flex h-12 items-center justify-center gap-3 rounded-[10px] border border-bad bg-bad/5 font-medium text-bad"
      >
        <LogOut size={18} className="rtl:rotate-180" />
        {t("nav.logout")}
      </button>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="hidden lg:block">{sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 start-0">{sidebar}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label={t("nav.openMenu")}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white lg:pointer-events-none"
          >
            <PanelLeft size={18} className="rtl:rotate-180" />
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/notifications"
              aria-label={t("nav.notifications")}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white"
            >
              <Bell size={17} />
              <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </Link>
            <Link href="/profile" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-sky text-[14px] font-bold italic text-navy">
                R
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-[12px] font-medium text-ink">Roberts Junior</span>
                <span className="rounded-full bg-ok/15 px-2 text-[10px] text-ok">● {t("common.admin")}</span>
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
