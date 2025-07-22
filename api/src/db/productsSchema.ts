import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { z } from "zod";

// This file defines the schema for the "users" table in the database using Drizzle ORM
export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  // doublePrecision is used for floating-point numbers
  price: doublePrecision().notNull(),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name must not be empty")
    .max(255, "Name must be at most 255 characters"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().optional(),
  image: z
    .string()
    .url("Image URL must be a valid URL")
    .max(255, "Image URL must be at most 255 characters")
    .optional(),
});

export const updateProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must not be empty")
      .max(255, "Name must be at most 255 characters"),
    price: z.number().positive("Price must be greater than 0"),
    description: z.string().optional(),
    image: z
      .string()
      .url("Image URL must be a valid URL")
      .max(255, "Image URL must be at most 255 characters")
      .optional(),
  })
  .partial();
