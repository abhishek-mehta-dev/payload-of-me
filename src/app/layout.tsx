import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/theme-provider";
import { supabase } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

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

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Check if there are any published blogs to show in the navbar
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);
    
  const hasBlogs = count ? count > 0 : false;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar hasBlogs={hasBlogs} />
          <main className="pt-20">{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
