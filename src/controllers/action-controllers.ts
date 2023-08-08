import { Request, Response } from "express";

import { Action } from "../models/action";
import { Pizza } from "../models/pizza";
import { Ingredient } from "../models/ingredient";

export const addAction = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const actionExist = await Action.findOne({ name });

        if (actionExist) {
            return res.status(400).json({ message: 'Action exists already' });
        }

        const newAction = new Action({ name });
        await newAction.save();
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong during adding action. Please, try again later.' });
    }
}

export const getAllActionsNames = async (req: Request, res: Response) => {
    try {
        const actionName = await Action.find().select('name -_id')

        res.status(200).json({ actions: actionName })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please, try again later.' });
    }
}

export const getActionDetails = async (req: Request, res: Response) => {
    const actionName = req.params.actionName;
    try {

        const actionExist = await Action.findOne({ name: actionName })
            .populate("pizzas", "name -_id")
            .populate("ingredients", "name -_id");

        if (!actionExist) {
            return res.status(404).json({ success: false, message: "Action not found." })
        }
        res.status(200).json({ pizzas: actionExist?.pizzas, ingredients: actionExist?.ingredients });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
}

export const patchActionName = async (req: Request, res: Response) => {
    const actionName = req.params.actionName;
    const data = {
        name: req.body.name,
    };

    try {
        const actionExist = await Action.findOne({ name: actionName })
        if (!actionExist) {
            return res.status(404).json({
                success: false,
                message: 'Action not found.',
            });
        };

        await Action.findOneAndUpdate({ name: actionName }, data)

        res.status(200).json({ success: true, message: 'Action name was updated.' });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Something went wrong while updating the action name. Please try again later.',
        });
    }
}

export const deleteAction = async (req: Request, res: Response) => {
    const actionName = req.params.actionName;

    try {
        const actionExist = await Action.findOne({ name: actionName });
        if (actionExist) {

            await Pizza.updateMany({ actions: actionExist._id }, { $pull: { actions: actionExist._id } });
            await Ingredient.updateMany({ action: actionExist._id }, { $set: { action: null } });
            await actionExist.deleteOne({ name: actionName });
            res.status(204).json({ success: true, message: 'Action was deleted.' });
        } else {
            res.status(404).json({ success: false, message: 'Action not found.' });
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the action. Please try again later.',
        });
    }
}