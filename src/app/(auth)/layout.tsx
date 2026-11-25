import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white p-4">
      <div className="absolute end-4 top-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-[700px] rounded-[32px] border border-line bg-panel p-8">{children}</div>
    </div>
  );
}
