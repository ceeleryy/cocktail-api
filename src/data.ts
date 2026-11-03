import { setTimeout } from "node:timers/promises";

export type Cocktail = {
  id: number;
  name: string;
  ingredients: string[];
  glass: "coupe" | "highball" | "rocks" | "martini";
  garnish?: string;
};

export const cocktails: Cocktail[] = [
  {
    id: 1,
    name: "Mojito",
    ingredients: ["rum", "lime juice", "simple syrup", "mint", "soda water"],
    glass: "highball",
    garnish: "mint sprig",
  },
  {
    id: 2,
    name: "Negroni",
    ingredients: ["gin", "Campari", "sweet vermouth"],
    glass: "rocks",
    garnish: "orange peel",
  },
  {
    id: 3,
    name: "Margarita",
    ingredients: ["tequila", "lime juice", "triple sec"],
    glass: "coupe",
    garnish: "salt",
  },
  {
    id: 4,
    name: "Old Fashioned",
    ingredients: ["bourbon", "sugar", "bitters", "orange peel"],
    glass: "rocks",
    garnish: "orange peel",
  },
  {
    id: 5,
    name: "Cosmopolitan",
    ingredients: ["vodka", "lime juice", "triple sec", "cranberry juice"],
    glass: "martini",
    garnish: "lime wheel",
  },
];

export async function getCocktails(): Promise<Cocktail[]> {
  await setTimeout(1000); // wait 1 second
  return cocktails;
}