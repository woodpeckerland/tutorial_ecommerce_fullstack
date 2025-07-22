import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),
  name: varchar({ length: 255 }),
  address: text(),
});

export const createUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be at most 255 characters"),
  name: z.string().max(255, "Name must be at most 255 characters").optional(),
  address: z.string().optional(),
});

export const loginSchema = createUserSchema.pick({
  email: true,
  password: true,
});
