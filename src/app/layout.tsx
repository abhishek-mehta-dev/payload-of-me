import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/components/theme-provider";
import { supabase } from "@/lib/supabase";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-var",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
});

export const metadata: Metadata = {
  title: "Abhishek Mehta - Full Stack & Backend Developer",
  description:
    "Dedicated software developer with expertise in backend and Full-stack development. Skilled in MERN Stack, Python, Django, FastAPI, and building scalable web applications. Passionate about AI/ML, DevOps, and intelligent automation.",
  keywords:
    "Abhishek Mehta, Full Stack Developer, MERN Stack Developer, Backend Developer, React.js, Node.js, Next.js, Django, FastAPI, Python, Golang, SQL, NoSQL, API Development, Scalable Web Applications",
  authors: [{ name: "Abhishek Mehta" }],
  openGraph: {
    title: "Abhishek Mehta - Full Stack & Backend Developer",
    description:
      "Portfolio of Abhishek Mehta, software developer specializing in MERN stack, backend engineering, and scalable web solutions. Exploring AI/ML and DevOps for next-gen applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#12151c" },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Check if there are any published blogs to show in the navbar
  const { count } = await supabase
    .from("blogs")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const hasBlogs = count ? count > 0 : false;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Navbar hasBlogs={hasBlogs} />
            <main className="min-w-0 overflow-x-clip">{children}</main>
            <Footer />
            <Chatbot />
            <Cursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
