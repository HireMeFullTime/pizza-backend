import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const validation = Joi.object({
 name: Joi.string().min(2).trim(true).required(),
});

export const patchNameIngredientValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = {
    name: req.body.name,
  };

  const { error } = validation.validate(payload, { abortEarly: false });

  if (error !== null && error !== undefined) {
    return res
      .status(406)
      .json({ message: 'Validation failed', errors: error.details });
  }

  next();
};
