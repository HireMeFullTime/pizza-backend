import { Schema, model } from "mongoose";

interface IIngredient {
    name: string;
    pizzas?: string[];

}

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String, required: true },
    pizzas: [{ type: Schema.Types.ObjectId, ref: 'Pizza' }],

});

export const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)