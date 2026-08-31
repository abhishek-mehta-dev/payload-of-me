"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteChrome({
  children,
  hasBlogs,
}: {
  children: ReactNode;
  hasBlogs: boolean;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar hasBlogs={hasBlogs} />
      <main className="min-w-0 max-w-full overflow-x-hidden">{children}</main>
      <Footer />
      <Chatbot />
      <Cursor />
    </SmoothScroll>
  );
}
