import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const validation = Joi.object({
    name: Joi.string().min(2).required(),
    action: Joi.string().hex().min(24).required()
});

export const ingredientValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    const payload = {
        name: req.body.name,
        action: req.body.action
    };

    const { error } = validation.validate(payload, { abortEarly: false });

    if (error !== null && error !== undefined) {
        return res
            .status(406)
            .json({ message: 'Validation failed', errors: error.details });
    }

    next();
};