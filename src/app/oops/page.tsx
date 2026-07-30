import type { Metadata } from "next";
import OopsPage from "@/components/OopsPage";

export const metadata: Metadata = {
  title: "Repository Restricted | Abhishek Mehta",
  description: "This GitHub repository is private and not publicly accessible.",
};

export default function OopsRoute() {
  return <OopsPage />;
}
