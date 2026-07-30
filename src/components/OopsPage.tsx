"use client";

import { Shield, Lock } from "lucide-react";
import StatusPage from "@/components/StatusPage";

export default function OopsPage() {
  return (
    <StatusPage
      code="403"
      label="Restricted"
      title="Repository"
      accent="private"
      description="This GitHub repo holds proprietary code and client-sensitive config, so public access is locked."
      detailTitle="Why is this private?"
      detailBody="It includes client-specific implementations, API credentials patterns, or business logic that can't be shared publicly for security and confidentiality."
      icon={Shield}
      badgeIcon={Lock}
    />
  );
}
