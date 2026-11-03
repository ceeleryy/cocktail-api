type Cocktail = {
    id : number;
    name: string;
    ingredients: string[];
    glass: "coupe" | "highball" | "rocks" | "martini";
    garnish?: string
}

const cocktails: Cocktail[] = [
    {
        id: 1,
        name: "Mojito",
        ingredients: ["rum", "lime juice", "simple syrup", "mint", "soda water"],
        glass: "highball",
        garnish: "mint sprig"
    },
    {
        id: 2,
        name: "Negroni",
        ingredients: ["gin", "Campari", "sweet vermouth"],
        glass: "rocks",
        garnish: "orange peel"
    },
    {
        id: 3,
        name: "Margarita",
        ingredients: ["tequila", "lime juice", "triple sec"],
        glass: "coupe",
        garnish: "salt"
    },
    {
        id: 4,
        name: "Old Fashioned",
        ingredients: ["bourbon", "sugar", "bitters", "orange peel"],
        glass: "rocks",
        garnish: "orange peel"
    },
    {
        id: 5,
        name: "Cosmopolitan",
        ingredients: ["vodka", "lime juice", "triple sec", "cranberry juice"],
        glass: "martini",
        garnish: "lime wheel"
    }
];

function canMake(cocktail: Cocktail, myBar: string[]): boolean {
    return cocktail.ingredients.every(ingredient => myBar.includes(ingredient));
}

const myBar = ["tequila", "lime juice", "triple sec", "vodka", "cranberry juice"];

const availableCocktails = cocktails.filter(cocktail => canMake(cocktail, myBar));

console.log("Cocktails you can make:");
availableCocktails.forEach(cocktail => console.log(cocktail.name));
