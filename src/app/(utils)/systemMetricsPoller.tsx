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
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          console.warn(`HTTP error 500 thrown:  ${response.status}: ${await response.text()}`);
          return;
        }

        const data = await response.json();

        batchUpdate({
          latency: data.latency,
          serverLatency: data.latency,
        });
      } catch (err: any) {
        if (err) {
          console.error("Network metrics polling failed:", err);
        }
      }
    };

    const visitorPoll = async () => {

        //register as new user if user does not exist in db. return the total visitor count from db and update the state. 
        // set a localstorage item to prevent multiple increments from the same user.
        // if the user has already visited, just fetch the total visitor count from db and update the state.
        
      try {
      const hasVisited = localStorage.getItem("has_visited_site");

      if(!hasVisited) {
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ visitorId: crypto.randomUUID() }),
          signal: controller.signal,
          cache: "no-store",
        });

      if (!response.ok) {
        console.warn(`HTTP error! Status: ${response.status}`);
        return;
      }

      localStorage.setItem("has_visited_site", "true");
      
      const data = await response.json();

      batchUpdate({ visitCount: data.userCount });
    }
    else {
      
      const response = await fetch("/api/users?returnType=userCount", {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
      });
  
      const data = await response.json();
      batchUpdate({ visitCount: data.visitCount });
    }
  } catch (err: any) {
    if (err.name !== "AbortError") {
      console.warn("Visitor metrics polling failed:", err);
      return;
    }
  }
};

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
          console.warn("Metrics polling failed:", err);
          return;
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
          console.warn("Attempts metric polling failed:", err);
          return;
        }
      }
    };

    const activeUsersPoll = async () => {
      try {
        const response = await fetch("/api/users?returnType=getActiveUsers", {
          signal: controller.signal,
          cache: "no-store",
        });
        

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error 500 thrown:  ${response.status}: ${errorText}`);
}

        const data = await response.json();

        batchUpdate({
          activeUsers: data.usersOnline,
        });

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Active Users metric polling failed:", err);
          return;
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
        console.warn(`HTTP error 500 thrown: ${response.status}: ${errorText}`);
        return;
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

    const serverDataPoll = async () => {
    try {
      const response = await fetch("/api/serverInfo", {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
      });

      if (!response.ok) {
          const errorText = await response.text();
            console.warn(`Server metrics stream paused (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();

        batchUpdate({
          serverCountry: data.country,
        });

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Server data metric polling failed:", err);
          return;
        }
      }

    }
  
    memoryPoll(); // Run immediately on mount
    serverDataPoll(); // Run immediately on mount
    networkPoll(); // Run immediately on mount
    visitorPoll(); // Run immediately on mount
    activeUsersPoll(); // Run immediately on mount
    attemptsPoll(); // Run immediately on mount
    demographicPoll(); // Run immediately on mount


    const interval = setInterval(() => {
      networkPoll();
      memoryPoll();
    }, 1000); // Poll every 1 second

    const delayedInterval = setInterval(() => {
      attemptsPoll();
      activeUsersPoll();
      demographicPoll();
    }, 5000); // Poll every 5 seconds

    return () => {
      controller.abort();
      clearInterval(interval);
      clearInterval(delayedInterval);
    };
  }, [mounted, batchUpdate]);

  return null;
}