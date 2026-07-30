"use client";

import { Rocket, Clock } from "lucide-react";
import StatusPage from "@/components/StatusPage";

export default function ComingSoonPage() {
  return (
    <StatusPage
      code="202"
      label="Shipping"
      title="Coming"
      accent="soon"
      description="This project is still in the build pipeline — demos and deeper walkthroughs land here when it's ready."
      detailTitle="What's cooking?"
      detailBody="Architecture, APIs, and polish are underway. Check back for a live demo, or explore other shipped work on the projects deck."
      icon={Rocket}
      badgeIcon={Clock}
    />
  );
}
