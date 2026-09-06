import { jsonb, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const portfolioContentTable = pgTable("portfolio_content", {
  id: serial("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});