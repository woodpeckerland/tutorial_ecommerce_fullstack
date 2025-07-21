import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// pool that manages multiple connections to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
