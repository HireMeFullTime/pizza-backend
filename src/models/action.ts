import { Schema, Types, model } from "mongoose";

interface IAction {
    name: string;
    ingredients?: Types.ObjectId[];
    pizzas?: Types.ObjectId[];
}

const actionSchema = new Schema<IAction>({
    name: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    pizzas: [{ type: Schema.Types.ObjectId, ref: 'Pizza' }]
});

export const Action = model<IAction>('Action', actionSchema)