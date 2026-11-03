import { cocktails, getCocktails, type Cocktail } from "./data.js";
import { canMake, missingIngredients } from "./bar.js";

const allCocktails =  await getCocktails();

const myBar = [
  "tequila",
  "lime juice",
  "triple sec",
  "vodka",
  "cranberry juice",
];

const availableCocktails = allCocktails.filter((cocktail: Cocktail) =>
  canMake(cocktail, myBar),
);

const lines = allCocktails.map((cocktail) => {
  const missing = missingIngredients(cocktail, myBar);
  return missing.length > 0
    ? `${cocktail.name} –> missing: ${missing.join(", ")}`
    : `${cocktail.name} –> ready to mix!`;
});

lines.forEach((line) => console.log(line));
