import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { addCocktail, cocktails, getCocktails } from "./data.js";
import { canMake } from "./bar.js";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to the cocktail bar 🍸"));

app.get("/cocktails", async (c) => {
  const cocktails = await getCocktails();
  return c.json(cocktails);
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
  const cocktails = await getCocktails();
  const cocktail = cocktails.find((drink) => drink.id === id);
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
