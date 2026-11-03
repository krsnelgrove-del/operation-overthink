"use client";

import { useEffect } from "react";

export function usePresenceTracker(visitorId: string | null) {
  useEffect(() => {
    if (!visitorId) return;

    const updatePresence = (isOnline: boolean) => {
      fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, isOnline }),
      }).catch((err) => console.error("Presence update failed:", err));
    };

    updatePresence(true);

    const heartbeatInterval = setInterval(() => {
      updatePresence(true);
    }, 45000);

    const handleUnload = () => {
      const data = JSON.stringify({ visitorId, isOnline: false });
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon("/api/users", blob);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updatePresence(false);
      } else {
        updatePresence(true);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      updatePresence(false);
    };
  }, [visitorId]);
}