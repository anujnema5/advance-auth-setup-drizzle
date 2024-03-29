import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import pg from 'pg'
dotenv.config();
 
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  }
} satisfies Config;