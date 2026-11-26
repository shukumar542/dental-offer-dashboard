"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  categories as seedCategories,
  clinics as seedClinics,
  faqs as seedFaqs,
  help as seedHelp,
  users as seedUsers,
  type Audience,
  type Category,
  type Clinic,
  type Faq,
  type HelpItem,
  type KycStatus,
  type Subscription,
  type User,
  type UserStatus,
} from "@/lib/data";

/**
 * In-memory mock store shared by all admin pages (list ↔ detail ↔ form).
 * Swap the functions below for API calls when a backend exists. Resets on full reload.
 */
type Store = {
  users: User[];
  toggleUser: (id: number) => void;

  clinics: Clinic[];
  addClinic: (c: Omit<Clinic, "id">) => number;
  updateClinic: (id: number, patch: Partial<Clinic>) => void;
  toggleClinic: (id: number) => void;
  setVerification: (id: number, status: KycStatus) => void;
  setSubscription: (id: number, sub: Subscription) => void;

  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (id: number) => void;

  faqs: Faq[];
  addFaq: (f: { q: string; a: string; audience: Audience }) => void;
  updateFaq: (id: number, f: { q: string; a: string; audience: Audience }) => void;
  deleteFaq: (id: number) => void;

  help: HelpItem[];
  resolveHelp: (id: number) => void;

  /** Edited values only; anything not edited falls back to the translated default. */
  legal: Record<string, string>;
  saveLegal: (v: Record<string, string>) => void;
  profile: Record<string, string>;
  saveProfile: (v: Record<string, string>) => void;
};

const Ctx = createContext<Store | null>(null);

const flip = (s: UserStatus): UserStatus => (s === "Active" ? "Blocked" : "Active");
let nextId = 1000;

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState(seedUsers);
  const [clinics, setClinics] = useState(seedClinics);
  const [categories, setCategories] = useState(seedCategories);
  const [faqs, setFaqs] = useState(seedFaqs);
  const [help, setHelp] = useState(seedHelp);
  const [legal, setLegal] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<Record<string, string>>({});

  const patchClinic = useCallback(
    (id: number, patch: Partial<Clinic>) =>
      setClinics((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    [],
  );

  const store = useMemo<Store>(
    () => ({
      users,
      toggleUser: (id) => setUsers((us) => us.map((u) => (u.id === id ? { ...u, status: flip(u.status) } : u))),

      clinics,
      addClinic: (c) => {
        const id = ++nextId;
        setClinics((cs) => [{ ...c, id }, ...cs]);
        return id;
      },
      updateClinic: patchClinic,
      toggleClinic: (id) => setClinics((cs) => cs.map((c) => (c.id === id ? { ...c, status: flip(c.status) } : c))),
      setVerification: (id, verification) => patchClinic(id, { verification }),
      setSubscription: (id, subscription) => patchClinic(id, { subscription }),

      categories,
      addCategory: (name) => setCategories((cs) => [...cs, { id: ++nextId, name }]),
      updateCategory: (id, name) => setCategories((cs) => cs.map((c) => (c.id === id ? { ...c, name } : c))),
      deleteCategory: (id) => setCategories((cs) => cs.filter((c) => c.id !== id)),

      faqs,
      addFaq: (f) => setFaqs((fs) => [...fs, { ...f, id: ++nextId }]),
      updateFaq: (id, f) => setFaqs((fs) => fs.map((x) => (x.id === id ? { ...x, ...f } : x))),
      deleteFaq: (id) => setFaqs((fs) => fs.filter((x) => x.id !== id)),

      help,
      resolveHelp: (id) => setHelp((hs) => hs.map((h) => (h.id === id ? { ...h, status: "Resolved" } : h))),

      legal,
      saveLegal: (v) => setLegal((cur) => ({ ...cur, ...v })),
      profile,
      saveProfile: (v) => setProfile((cur) => ({ ...cur, ...v })),
    }),
    [users, clinics, categories, faqs, help, legal, profile, patchClinic],
  );

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useAdminData() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminData must be used inside <AdminDataProvider>");
  return v;
}
