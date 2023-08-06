import { Schema, Types, model } from "mongoose";

interface IPizza {
    name: string;
    ingredients: Types.ObjectId[];
    actions: Types.ObjectId[];
}

const pizzaSchema = new Schema<IPizza>({
    name: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }]
});

export const Pizza = model<IPizza>('Pizza', pizzaSchema)