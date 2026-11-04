// src/components/GlobalPresenceProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { usePresenceTracker } from "@/hooks/usePresenceTracker";
import { useDashboardStore } from "@/app/(utils)/useMetricsStore";

export function GlobalPresenceProvider({ children }: { children: React.ReactNode }) {
  const visitorId = useDashboardStore((state) => state.visitorId);
  const update = useDashboardStore((state) => state.batchUpdate);

  useEffect(() => {
    let id = localStorage.getItem("visitorId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitorId", id);
    }
    update({ visitorId: id });
  }, [update]);

  usePresenceTracker(visitorId);

  return <>{children}</>;
}