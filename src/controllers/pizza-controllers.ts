import { Request, Response } from "express";
import { Pizza } from "../models/pizza";
import { Action } from "../models/action";
import { Ingredient } from "../models/ingredient";

export const addPizza = async (req: Request, res: Response) => {
    try {
        const { name, actions, ingredients } = req.body;
        console.log("actions:", actions);
        console.log("ingredients:", ingredients);
        const pizzaExist = await Pizza.findOne({ name });

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