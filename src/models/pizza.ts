import { Schema, model } from "mongoose";

interface IPizza {
    name: string;
    ingredients: string[];
    actions: string[];
}

const pizzaSchema = new Schema<IPizza>({
    name: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }]
});

export const Pizza = model<IPizza>('Pizza', pizzaSchema)