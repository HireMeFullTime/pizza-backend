

import { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";
import { Action } from "../models/action";

export const addIngredient = async (req: Request, res: Response) => {
    try {
        const { name, action } = req.body;
        const ingredientExist = await Ingredient.findOne({ name });

        if (ingredientExist) {
            return res.status(400).json({ message: 'Ingredient exists already' });
        }

        const newIngredient = new Ingredient({ name, action });
        const actionsToLink = await Action.find({ _id: { $in: action } });

        for (const action of actionsToLink) {
            if (action.ingredients) {
                action.ingredients.push(newIngredient._id);
                await action.save();
            }
        }

        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong during adding ingredient. Please, try again later.' });
    }
}

