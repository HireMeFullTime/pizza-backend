import { Schema, model, Types } from "mongoose";

interface IIngredient {
    name: string;
    pizzas?: Types.ObjectId[];
    action: Types.ObjectId;
}

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String, required: true },
    pizzas: [{ type: Schema.Types.ObjectId, ref: 'Pizza' }],
    action: { type: Schema.Types.ObjectId, ref: 'Action', required: true },
});

export const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)