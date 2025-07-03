import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";

// This file defines the schema for the "users" table in the database using Drizzle ORM
export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  // doublePrecision is used for floating-point numbers
  price: doublePrecision().notNull(),
});
