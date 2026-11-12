import { pgTable, pgEnum, integer, text, numeric, primaryKey } from "drizzle-orm/pg-core";

export const glassEnum = pgEnum("glass", ["coupe", "highball", "rocks", "martini"]);

export const cocktails = pgTable("cocktails", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  glass: glassEnum().notNull(),
  garnish: text(),
});

export const ingredients = pgTable("ingredients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
});

export const unitEnum = pgEnum("unit", ["ml", "cl", "oz", "dash", "tsp", "leaves", "piece", "top"]);

export const cocktailIngredients = pgTable(
  "cocktail_ingredients",
  {
    cocktailId: integer("cocktail_id")
      .notNull()
      .references(() => cocktails.id, { onDelete: "cascade" }),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredients.id),
    amount: numeric({ mode: "number" }).notNull(),
    unit: unitEnum().notNull(),
  },
  (table) => [primaryKey({ columns: [table.cocktailId, table.ingredientId] })]
);