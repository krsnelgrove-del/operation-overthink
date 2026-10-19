import React from "react";

import {
  BreachAttemptsCard,
  ActiveSessionsCard,
  DataTrackerCard,
  DecryptionEfficiencyCard,
} from "@/components/cards";

import serverLatencyCard from "@/components/cards/serverLatency";
import DemographicMap from "@/components/cards/demographicMap";

export interface CardConfig {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  gridSpan?: string;
  initialData?: Record<string, any>;
}


export interface LatencyDataPoint {
  time: string;
  latency: number;
}


export const DashboardCards: CardConfig[] = [  
  {
    id: "breach-attempts",
    title: "Breach Attempts",
    component: BreachAttemptsCard,
    initialData: { totalAttempts: 142 },
  },
  {
    id: "active-sessions",
    title: "Active Sessions",
    component: ActiveSessionsCard,
    initialData: { activeUsers: 294 },
  },
  {
    id: "data-tracker",
    title: "Data Tracker",
    component: DataTrackerCard,
    initialData: { memoryUsage: 812, memoryMax: 1024 },
  },
  {
    id: "decryption-efficiency",
    title: "Decryption Efficiency",
    component: DecryptionEfficiencyCard,
    initialData: { rate: "94.5392%" },
  },
  {
    id: "server-latency",
    title: "Server Latency",
    component: serverLatencyCard,
    initialData: { pingMs: 18},
  },
  {
    id: "demographic-map",
    title: "Demographic Map",
    component: DemographicMap,
    initialData: {},
  },
];

