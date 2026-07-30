import type { Metadata } from "next";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Coming Soon | Abhishek Mehta",
  description: "This project is still shipping — check back soon for the live demo.",
};

export default function ComingSoonRoute() {
  return <ComingSoonPage />;
}
