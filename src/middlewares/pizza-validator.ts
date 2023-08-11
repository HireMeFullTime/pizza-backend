import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const validation = Joi.object({
    name: Joi.string().min(2).required(),
    ingredients: Joi.array().items(Joi.string().hex().min(24)).required(),
    actions: Joi.array().items(Joi.string().hex().min(24)).required()
});

export const pizzaValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    const payload = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        actions: req.body.actions
    };

    const { error } = validation.validate(payload, { abortEarly: false });

    if (error !== null && error !== undefined) {
        return res
            .status(406)
            .json({ message: 'Validation failed', errors: error.details });
    }

    next();
};