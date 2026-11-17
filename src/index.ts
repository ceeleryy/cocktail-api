import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { addCocktail, getCocktails } from "./data.js";
import { canMake } from "./bar.js";
import { db } from "./db/index.js";
import { cocktails } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to the cocktail bar 🍸"));

app.get("/cocktails", async (c) => {
  const result = await db.select().from(cocktails);
  return c.json(result);
});

app.get("/cocktails/makeable", async (c) => {
    const ingredientsQuery = c.req.query("ingredients");
    if (!ingredientsQuery) {
        return c.json({ error: "No ingredients provided" }, 400);
    }
    const myBar = ingredientsQuery.split(",").map((item) => item.trim());
    const cocktails = await getCocktails();
    const makeableCocktails = cocktails.filter((cocktail) => canMake(cocktail, myBar));
    return c.json(makeableCocktails);
});

app.get("/cocktails/:id", async (c) => {
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    return c.json({ error: "id must be a number" }, 400);
  }

  const [cocktail] = await db
    .select()
    .from(cocktails)
    .where(eq(cocktails.id, id));

  if (!cocktail) {
    return c.json({ error: "Cocktail not found" }, 404);
  }

  return c.json(cocktail);
});

app.post("/cocktails", async (c) => {
    const body = await c.req.json();
    if (!body.name || !Array.isArray(body.ingredients)) {
        return c.json({ error: "name and ingredients are required" }, 400);
    }
    const created = addCocktail(body);
    return c.json(created, 201);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
   console.log(`Server running on http://localhost:${info.port}`);
});
