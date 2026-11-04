import { 
  defineContract,
  rlsEnabled, 
  now, 
  policySelect, 
  policyUpdate, 
  policyInsert, 
  role 
} from '@prisma/orm-postgres/contract-builder';

export const contract = defineContract({}, ({ field, model }) => {
  
  const user = model('User', {
    fields: {
      id: field.id.uuidv4String(),
      countryOfOrigin: field.text().default("NaN"),
      correctAttempts: field.int().default(0),
      incorrectAttempts: field.int().default(0),
      isActive: field.boolean().default(false),
      role: field.text().default('USER'),
      createdAt: field.text().default(now()),
      updatedAt: field.text().default(now()),
      lastOnline: field.text().default(now()),
    },
  });

  const dbRoles = {
    publicRole: role("anon"),
    authRole: role("authenticated"),
    adminRole: role("supabase_admin"),
  };

  return {
    models: {
      User: user,
    },

    entities: [
      rlsEnabled(user),
      dbRoles.publicRole,
      dbRoles.authRole,
      dbRoles.adminRole,
    ],

    policies: [
      policySelect(user, {
        name: "Enable user read access for all users",
        roles: [dbRoles.publicRole, dbRoles.adminRole, dbRoles.authRole],
        using: "true",
      }),
      policyInsert(user, {
        name: "Enable user registration for all roles",
        roles: [dbRoles.publicRole, dbRoles.adminRole, dbRoles.authRole],
        withCheck: "true",
      }),
      policyUpdate(user, {
        name: "Enable state changes and increment actions on user schemas",
        roles: [dbRoles.publicRole, dbRoles.adminRole, dbRoles.authRole],
        using: "true",
      }),
    ]
  };
});
