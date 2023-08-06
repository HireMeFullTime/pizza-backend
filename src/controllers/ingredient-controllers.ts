

import { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";

export const addIngredient = async (req: Request, res: Response) => {
    try {
        const { name, action } = req.body;
        const ingredientExist = await Ingredient.findOne({ name });

        if (ingredientExist) {
            return res.status(400).json({ message: 'Ingredient exists already' });
        }

        const newIngredient = new Ingredient({ name, action });
        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong during adding ingredient. Please, try again later.' });
    }
}

