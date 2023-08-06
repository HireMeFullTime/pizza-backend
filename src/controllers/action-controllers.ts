import { Request, Response } from "express";

import { Action } from "../models/action";

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
