import { defineContract, enumType, member } from '@prisma/orm-postgres/contract-builder';

// 1. Explicitly satisfy the exact type contract required by your package version
const pgText = { 
  codecId: "pg/text@1", 
  nativeType: "text" 
} as const;

// 2. Define the demographic country code enum type using the valid object
export const CountryCode = enumType(
  "CountryCode",
  pgText, 
  member("US", "US"),
  member("CA", "CA"),
  member("MX", "MX"),
  member("GB", "GB"),
  member("DE", "DE"),
  member("FR", "FR"),
  member("IT", "IT"),
  member("ES", "ES"),
  member("NL", "NL"),
  member("CH", "CH"),
  member("CN", "CN"),
  member("JP", "JP"),
  member("KR", "KR"),
  member("IN", "IN"),
  member("SG", "SG"),
  member("SA", "SA"),
  member("AE", "AE"),
  member("BR", "BR"),
  member("AR", "AR"),
  member("AU", "AU"),
  member("NZ", "NZ"),
  member("ZA", "ZA"),
  member("NaN", "NaN") 
);

export const contract = defineContract({}, ({ field, model, rel }) => {
  const visitorCount = model('VisitorCount', {
    fields: {
      id: field.text().id().default('global'),
      count: field.int().default(0),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const decryptionEfficiency = model('Attempts', {
    fields: {
      id: field.text().id().default('global'),
      correctAttempts: field.int().default(0),
      incorrectAttempts: field.int().default(0),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });
  const user = model('User', {
    fields: {
      id: field.text().id().default('global'),
      countryOfOrigin: field.column(CountryCode).default("NaN"),
      isActive: field.boolean().default(true),
      role: field.text().default('USER'),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  return {
    models: {
      User: user,
      VisitorCount: visitorCount,
      Attempts: decryptionEfficiency,
    },
  };
});
