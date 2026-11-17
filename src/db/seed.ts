import { db } from "./index.js";
import { cocktails, ingredients, cocktailIngredients } from "./schema.js";

const [negroni] = await db
  .insert(cocktails)
  .values({ name: "Negroni", glass: "rocks", garnish: "orange peel" })
  .returning();

const [gin, campari, vermouth] = await db
  .insert(ingredients)
  .values([{ name: "gin" }, { name: "Campari" }, { name: "sweet vermouth" }])
  .returning();

const [gimlet] = await db
  .insert(cocktails)
  .values({ name: "Gimlet", glass: "coupe", garnish: "lime wheel" })
  .returning();

const [lime, simple] = await db
  .insert(ingredients)
  .values([{ name: "lime juice" }, { name: "simple syrup" }])
  .returning();

const [margarita] = await db
  .insert(cocktails)
  .values({ name: "Margarita", glass: "coupe", garnish: "salt rim" })
  .returning();

const [tequila, tripleSec] = await db
  .insert(ingredients)
  .values([{ name: "tequila" }, { name: "triple sec" }])
  .returning();

const [mojito] = await db
  .insert(cocktails)
  .values({ name: "Mojito", glass: "highball", garnish: "mint sprig" })
  .returning();

const [rum, mint, soda] = await db
  .insert(ingredients)
  .values([{ name: "white rum" }, { name: "mint" }, { name: "soda water" }])
  .returning();

await db.insert(cocktailIngredients).values([
  // Negroni
  { cocktailId: negroni!.id, ingredientId: gin!.id, amount: 30, unit: "ml" },
  { cocktailId: negroni!.id, ingredientId: campari!.id, amount: 30, unit: "ml" },
  { cocktailId: negroni!.id, ingredientId: vermouth!.id, amount: 30, unit: "ml" },

  // Gimlet
  { cocktailId: gimlet!.id, ingredientId: gin!.id, amount: 50, unit: "ml" },
  { cocktailId: gimlet!.id, ingredientId: lime!.id, amount: 25, unit: "ml" },
  { cocktailId: gimlet!.id, ingredientId: simple!.id, amount: 15, unit: "ml" },

  // Margarita 
  { cocktailId: margarita!.id, ingredientId: tequila!.id, amount: 50, unit: "ml" },
  { cocktailId: margarita!.id, ingredientId: lime!.id, amount: 25, unit: "ml" },
  { cocktailId: margarita!.id, ingredientId: tripleSec!.id, amount: 20, unit: "ml" },

  // Mojito
  { cocktailId: mojito!.id, ingredientId: rum!.id, amount: 50, unit: "ml" },
  { cocktailId: mojito!.id, ingredientId: lime!.id, amount: 25, unit: "ml" },
  { cocktailId: mojito!.id, ingredientId: simple!.id, amount: 15, unit: "ml" },
  { cocktailId: mojito!.id, ingredientId: mint!.id, amount: 8, unit: "leaves" },
  { cocktailId: mojito!.id, ingredientId: soda!.id, amount: 60, unit: "ml" },
]);

console.log("Seeded ✅");
await db.$client.end();