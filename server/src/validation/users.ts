import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const getUserRegistrationValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(3).required(),
        passwordConfirm: Joi.any().valid(Joi.ref("password")).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json(error)
    } else {
        next()
    }
}


