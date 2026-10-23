import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    // Map your contract configuration directly
      contract: "./src/prisma/contract.ts", 
    
    // Map the generated targets
    output: "./src/prisma",
    
    db: { 
      connection: process.env.DATABASE_URL,
    },
  }),
});