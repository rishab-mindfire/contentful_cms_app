import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { nextCookies } from 'better-auth/next-js';

// Setup the connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the adapter
const adapter = new PrismaPg(pool);

// Instantiate prisma client
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: (process.env.GITHUB_CLIENT_ID as string) || '',
      clientSecret: (process.env.GITHUB_CLIENT_SECRET as string) || '',
    },
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || '',
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || '',
    },
  },
  plugins: [nextCookies()],
});
