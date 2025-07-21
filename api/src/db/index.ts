import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// pool that manages multiple connections to the database
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
