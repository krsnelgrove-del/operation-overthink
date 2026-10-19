import { db } from "@/prisma/db";
import { number } from "motion";

async function main() {
  console.log('🔌 Connecting database driver...');
const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("❌ DATABASE_URL environment variable is missing from your .env file!");
  }

  // 3. Pass the connection string binding directly to Prisma 8
  await db.connect({ url: databaseUrl }); 

console.log('⏳ Starting database seeding sequence...');

function randomBoolean() {
      let result = false;
      let v = Math.floor(Math.random() * 1);

      v === 1 ? result = false : result = true;
      return result;
}

  // 1. Seed the VisitorCount model
  await db.orm.public.VisitorCount.where({id: 'global'}).upsert({
    update: {},
    create: {
      id: 'global',
      count: Math.floor((Math.random() * 5000)),
    },
  });
  console.log('✅ Seeded VisitorCount data.');

  // 2. Seed the Attempts (Decryption Efficiency) model
  await db.orm.public.Attempts.where({ id: 'global' }).upsert({
    update: {},
    create: {
      id: 'global',
      correctAttempts: Math.floor(Math.random() * 200),
      incorrectAttempts: Math.floor(Math.random() * 200),
    },
  });
  console.log('✅ Seeded Decryption Efficiency data.');

  // 3. Seed Mock Demographics Users
  const mockUsers = [
    { id: 'user_01', countryOfOrigin: 'US', role: 'USER', isActive: randomBoolean() },
    { id: 'user_02', countryOfOrigin: 'US', role: 'USER', isActive: randomBoolean() },
    { id: 'user_03', countryOfOrigin: 'US', role: 'USER', isActive: randomBoolean() },
    { id: 'user_04', countryOfOrigin: 'US', role: 'USER', isActive: randomBoolean() },
    { id: 'user_05', countryOfOrigin: 'US', role: 'USER', isActive: randomBoolean() },
    { id: 'user_06', countryOfOrigin: 'CA', role: 'USER', isActive: randomBoolean() },
    { id: 'user_07', countryOfOrigin: 'MX', role: 'USER', isActive: randomBoolean() },
    { id: 'user_08', countryOfOrigin: 'GB', role: 'USER', isActive: randomBoolean() },
    { id: 'user_09', countryOfOrigin: 'MX', role: 'USER', isActive: randomBoolean() },
    { id: 'user_10', countryOfOrigin: 'GB', role: 'USER', isActive: randomBoolean() },
    { id: 'user_11', countryOfOrigin: 'NaN', role: 'USER', isActive: randomBoolean() },  //test an invalid
  ];

  for (const userData of mockUsers) {
    // FIX: Changed where({ id: 'global' }) to target the actual user's unique id
    await db.orm.public.User.where({ id: userData.id }).upsert({
      update: {
        countryOfOrigin: userData.countryOfOrigin,
        role: userData.role,
        isActive: userData.isActive,
      },
      create: userData,
    });
  }
  console.log(`✅ Seeded ${mockUsers.length} Demographic User records.`);
  
  console.log('Yeeuh boy! Database seeding completed successfully!');
}

main()
  .then(() => {
    console.log('Process exiting.');
    process.exit(0);
  })
  .catch((e) => {
    console.error('❌ Seeding process encountered an error:', e);
    process.exit(1);
  });