import type { Cocktail } from "./data.js";

export function canMake(cocktail: Cocktail, myBar: string[]): boolean {
  return cocktail.ingredients.every((ingredient) => myBar.includes(ingredient));
}

export function missingIngredients(cocktail: Cocktail, myBar: string[]): string[] {
  return cocktail.ingredients.filter(
    (ingredient) => !myBar.includes(ingredient),
  );
}