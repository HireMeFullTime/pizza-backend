import { Schema, model } from "mongoose";

interface IAction {
    name: string;
    ingredients?: string[];
    pizzas?: string[];
}

const actionSchema = new Schema<IAction>({
    name: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    pizzas: [{ type: Schema.Types.ObjectId, ref: 'Pizza' }]
});

export const Action = model<IAction>('Action', actionSchema)