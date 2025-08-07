import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Navbar from "@/components/Navbar" 
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - MERN Stack Developer",
  description:
    "Full-stack developer specializing in MERN stack, backend development, and scalable web applications. Expert in React.js, Node.js, Python, and Django.",
  keywords:
    "MERN Stack Developer, Full Stack Developer, React.js, Node.js, Python, Django, Backend Developer",
  authors: [{ name: "Abhishek Mehta" }],
  openGraph: {
    title: "Portfolio - MERN Stack Developer",
    description:
      "Full-stack developer specializing in MERN stack and backend development",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
