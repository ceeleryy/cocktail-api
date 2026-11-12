CREATE TYPE "public"."glass" AS ENUM('coupe', 'highball', 'rocks', 'martini');--> statement-breakpoint
CREATE TYPE "public"."unit" AS ENUM('ml', 'cl', 'oz', 'dash', 'tsp', 'leaves', 'piece', 'top');--> statement-breakpoint
CREATE TABLE "cocktail_ingredients" (
	"cocktail_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"amount" numeric NOT NULL,
	"unit" "unit" NOT NULL,
	CONSTRAINT "cocktail_ingredients_cocktail_id_ingredient_id_pk" PRIMARY KEY("cocktail_id","ingredient_id")
);
--> statement-breakpoint
CREATE TABLE "cocktails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cocktails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"glass" "glass" NOT NULL,
	"garnish" text,
	CONSTRAINT "cocktails_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ingredients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_cocktail_id_cocktails_id_fk" FOREIGN KEY ("cocktail_id") REFERENCES "public"."cocktails"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;