import postgres from '@prisma/orm-postgres/runtime';
import { Temporal } from "@js-temporal/polyfill";
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

if (typeof globalThis.Temporal === "undefined") {
  globalThis.Temporal = Temporal as any;
}

export const db = postgres<Contract>({
  
  contractJson,
  url: process.env.DIRECT_URL!,
});
