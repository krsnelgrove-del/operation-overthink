import { create } from "zustand";

export interface CountryOfOrigin {
  origin: "NA" | "EU" | "CA" | "SA" | "AU" | "RU" | "AF",
  count: number,
}
interface UseMetricsStore {
  latency: number | null;
  visitCount: number | null;
  decryptionEfficiency: number | null;
  correctAttempts: number | null;
  incorrectAttempts: number | null;
  totalAttempts: number | null;
  memoryUsage: number | null;
  memoryMax: number | null;
  demographic: CountryOfOrigin[] | null,
  serverLatency: number | null;
  activeUsers: number | null;
  
  batchUpdate: (updates: Partial<Omit<UseMetricsStore, "setMetric" | "batchUpdate">>) => void;
}

export const useDashboardStore = create<UseMetricsStore>((set) => ({
  latency: null,
  visitCount: null,
  decryptionEfficiency: null,
  correctAttempts: null,
  incorrectAttempts: null,
  totalAttempts: null,
  memoryUsage: null,
  memoryMax: null,
  demographic: null,
  serverLatency: null,
  activeUsers: 0,

  setMetric: (key: any, value: any) => set((state) => ({ ...state, [key]: value })),
  batchUpdate: (updates) => set((state) => ({ ...state, ...updates })),
}));