

import { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";
import { Action } from "../models/action";
import { Pizza } from "../models/pizza";

export const addIngredient = async (req: Request, res: Response) => {
    try {
        const { name, action } = req.body;
        const ingredientExist = await Ingredient.findOne({ name });
        const actionExist = await Action.findOne({ _id: action })
        if (ingredientExist) {
            return res.status(400).json({ message: 'Ingredient exists already' });
        }

        if (!actionExist) {
            return res.status(404).json({ success: false, message: 'action not found.' });
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

export const getAllIngredientsNames = async (req: Request, res: Response) => {
    try {
        const ingredientName = await Ingredient.find().select('name -_id')

        res.status(200).json({ ingredients: ingredientName })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please, try again later.' });
    }
}

export const getIngredientDetails = async (req: Request, res: Response) => {
    const ingredientName = req.params.ingredientName

    try {

        const ingredientExist = await Ingredient.findOne({ name: ingredientName })
            .populate("pizzas", "name -_id")
            .populate("action", "name -_id");

        if (!ingredientExist) {
            return res.status(404).json({ success: false, message: "Ingredient not found." })
        }
        res.status(200).json({ name: ingredientExist.name, pizzas: ingredientExist?.pizzas, action: ingredientExist?.action });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
}

export const patchIngredientName = async (req: Request, res: Response) => {
    const ingredientName = req.params.ingredientName;
    const data = {
        name: req.body.name,
    };

    try {
        const ingredientExist = await Ingredient.findOne({ name: ingredientName })
        if (!ingredientExist) {
            return res.status(404).json({
                success: false,
                message: 'Ingredient not found.',
            });
        };

        await Ingredient.findOneAndUpdate({ name: ingredientName }, data)

        res.status(200).json({ success: true, message: 'ingredient name was updated.' });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Something went wrong while updating the ingredient name. Please try again later.',
        });
    }
}

export const deleteIngredient = async (req: Request, res: Response) => {
    const ingredientName = req.params.ingredientName;

    try {
        const ingredientExist = await Ingredient.findOne({ name: ingredientName });
        if (ingredientExist) {
            await ingredientExist.deleteOne({ name: ingredientName });
            res.status(204).json({ success: true, message: 'ingredient was deleted.' });

            await Pizza.updateMany({ ingredients: ingredientExist._id, actions: ingredientExist._id }, { $pull: { ingredients: ingredientExist._id, actions: ingredientExist._id } });
            await Action.updateMany({ pizzas: ingredientExist._id }, { $pull: { pizzas: ingredientExist._id } });
        } else {
            res.status(404).json({ success: false, message: 'ingredient not found.' });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the ingredient. Please try again later.',
        });
    }
}