import { Request, Response } from "express";
import { Pizza } from "../models/pizza";
import { Action } from "../models/action";
import { Ingredient } from "../models/ingredient";


export const addPizza = async (req: Request, res: Response) => {
    try {
        const { name, actions, ingredients } = req.body;
        const pizzaExist = await Pizza.findOne({ name });
        const ingredientExist = await Ingredient.find({ _id: { $in: ingredients } });
        const missingIngredients = ingredients.filter((id: string) => !ingredientExist.some(ingredient => ingredient._id.toString() === id));
        if (missingIngredients.length > 0) {
            return res.status(404).json({ success: false, message: 'Ingredient not found.', });
        }

        const actionsExist = await Action.find({ _id: { $in: actions } });
        const missingActions = actions.filter((id: string) => !actionsExist.some(action => action._id.toString() === id));
        if (missingActions.length > 0) {
            return res.status(404).json({ success: false, message: 'Action not found.', missingActions });
        }
        if (pizzaExist) {
            return res.status(400).json({ message: 'Pizza exists already' });
        }

        const newPizza = new Pizza({ name, actions, ingredients });

        const actionsToLink = await Action.find({ _id: { $in: actions } });
        const ingredientsToLink = await Ingredient.find({ _id: { $in: ingredients } });

        for (const ingredient of ingredientsToLink) {
            if (ingredient.pizzas) {
                ingredient.pizzas.push(newPizza._id);
                await ingredient.save();
            }

        }

        for (const action of actionsToLink) {
            if (action.pizzas) {
                action.pizzas.push(newPizza._id);
                await action.save();
            }
        }

        await newPizza.save();
        res.status(201).json(newPizza);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong during adding Pizza. Please, try again later.' });
    }
}

export const getAllPizzasNames = async (req: Request, res: Response) => {
    try {
        const pizzaName = await Pizza.find().select('name -_id')

        res.status(200).json({ pizzas: pizzaName })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please, try again later.' });
    }
}

export const getPizzaDetails = async (req: Request, res: Response) => {
    const pizzaName = req.params.pizzaName;

    try {
        const pizzaExist = await Pizza.findOne({ name: pizzaName })
            .populate("ingredients", "name -_id")
            .populate("actions", "name -_id")

        if (!pizzaExist) {
            return res.status(404).json({ success: false, message: "Pizza not found." })
        }
        res.status(200).json({ name: pizzaExist.name, ingredients: pizzaExist?.ingredients, actions: pizzaExist?.actions });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }

}

export const patchPizzaName = async (req: Request, res: Response) => {
    const pizzaName = req.params.pizzaName;
    const data = {
        name: req.body.name,
    };

    try {
        const pizzaExist = await Pizza.findOne({ name: pizzaName })
        if (!pizzaExist) {
            return res.status(404).json({
                success: false,
                message: 'Pizza not found.',
            });
        };

        await Pizza.findOneAndUpdate({ name: pizzaName }, data)

        res.status(200).json({ success: true, message: 'Pizza name was updated.' });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Something went wrong while updating the pizza name. Please try again later.',
        });
    }
}

export const deletePizza = async (req: Request, res: Response) => {
    const pizzaName = req.params.pizzaName;

    try {
        const pizzaExist = await Pizza.findOne({ name: pizzaName });
        if (pizzaExist) {
            await pizzaExist.deleteOne({ name: pizzaName });
            res.status(204).json({ success: true, message: 'Pizza was deleted.' });

            await Ingredient.updateMany({ pizzas: pizzaExist._id }, { $pull: { pizzas: pizzaExist._id } });
            await Action.updateMany({ pizzas: pizzaExist._id }, { $pull: { pizzas: pizzaExist._id } });
        } else {
            res.status(404).json({ success: false, message: 'Pizza not found.' });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the pizza. Please try again later.',
        });
    }

}