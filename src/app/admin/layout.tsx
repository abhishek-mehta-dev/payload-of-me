import { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import { BUILD_STORIES } from "@/content/build-stories";

export const metadata: Metadata = {
  title: "Build Stories Admin | Abhishek Mehta",
  description: "Manage build stories and debug diaries for the portfolio.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden relative">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--brand)" }}
        aria-hidden
      />

      <Toaster
        position="top-center"
        containerClassName="!top-[max(1rem,env(safe-area-inset-top))]"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--line)",
            maxWidth: "min(100vw - 2rem, 28rem)",
          },
        }}
      />

      <div className="container-responsive relative z-10 py-6 sm:py-8 md:py-10">
        <header className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4 sm:pb-5">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-1.5">
              {BUILD_STORIES.admin.consoleCommand}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {BUILD_STORIES.admin.consoleTitle}
            </h1>
          </div>
          <Link
            href="/"
            className="btn-ghost-brand w-full sm:w-auto justify-center !py-2.5 text-sm shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </header>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
