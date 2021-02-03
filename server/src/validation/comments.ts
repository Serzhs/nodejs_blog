import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const createCommentValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        author: Joi.string().alphanum().max(30).required(),
        comment: Joi.string().max(255).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json(error)
    } else {
        next()
    }
}


