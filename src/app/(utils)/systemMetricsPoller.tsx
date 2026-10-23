// app/(utils)/systemMetricsPoller.tsx
"use client";

import { useDashboardStore } from "./useMetricsStore";
import { useEffect, useState } from "react";

export function SystemMetricsPoller() {
  const [mounted, setMounted] = useState(false);
  const batchUpdate = useDashboardStore((state) => state.batchUpdate);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const controller = new AbortController();

    const networkPoll = async () => {
      try {
        const response = await fetch("/api/networkMetric", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error 500 thrown:  ${response.status}: ${errorText}`);
}

        const data = await response.json();

        batchUpdate({
          latency: data.latency,
          serverLatency: data.latency,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Network metrics polling failed:", err);
        }
      }
    };

    const visitorPoll = async () => {
      try {
        const hasVisited = localStorage.getItem("has_visited_site");
        if (!hasVisited) {

          fetch("/api/metrics", { method: "POST", cache: "no-store" })
          .then((res) => res.json())
          .then((data) => {
            batchUpdate({ visitCount: data.visitCount });
          }).catch((err) => console.error("Failed to increment unique visit:", err));
          
          localStorage.setItem("has_visited_site", "true");
}
      }
    catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Visitor metrics polling failed:", err);
        }
      }}

    const memoryPoll = async () => {
      try {
        const response = await fetch("/api/memoryMetric", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error 500 thrown:  ${response.status}: ${errorText}`);
}

        const data = await response.json();

        batchUpdate({
          memoryUsage: data.usage,
          memoryMax: data.max,
        });

        console.log("Memory metrics updated:", data); // Debugging line

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Metrics polling failed:", err);
        }
      }
    };

    const attemptsPoll = async () => {
      try {
        const response = await fetch("/api/attemptsMetric", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error 500 thrown:  ${response.status}: ${errorText}`);
}

        const data = await response.json();

        batchUpdate({
          correctAttempts: data.correctAttempts,
          incorrectAttempts: data.incorrectAttempts,
        });

        console.log("Attempts metrics updated:", data); // Debugging line

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Attempts metric polling failed:", err);
        }
      }
    };

    const activeUsersPoll = async () => {
      try {
        const response = await fetch("/api/activeUsers", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error 500 thrown:  ${response.status}: ${errorText}`);
}

        const data = await response.json();

        batchUpdate({
          activeUsers: data.activeUsers,
        });

        console.log("Attempts metrics updated:", data); // Debugging line

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Active Users metric polling failed:", err);
        }
      }
    };

    const demographicPoll = async () => {
      try {
      const response = await fetch("/api/demographicMetric", {
        signal: controller.signal,
        cache:"no-store",
      });

      if(!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error 500 thrown: ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      batchUpdate({
        demographic: data.demographic,
      })
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Demographic metrics polling failed:", err);
        }
      }
    }

    const hasVisited = localStorage.getItem("has_visited");
  
    networkPoll(); // Run immediately on mount
    visitorPoll(); // Run immediately on mount
    memoryPoll(); // Run immediately on mount
    attemptsPoll(); // Run immediately on mount
    activeUsersPoll(); // Run immediately on mount
    demographicPoll(); // Run immediately on mount

    const interval = setInterval(() => {
      networkPoll();
      memoryPoll();
    }, 1000); // Poll every 1 second

    const delayedInterval = setInterval(() => {
      attemptsPoll();
      activeUsersPoll();
      demographicPoll();
    }, 5000); // Poll every 5 second

    return () => {
      controller.abort();
      clearInterval(interval);
      clearInterval(delayedInterval);
    };
  }, [mounted, batchUpdate]);

  return null;
}