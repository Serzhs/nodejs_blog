import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const postValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

export const getOnPostValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = postValidationSchema.validate(req.body);

    if (error) {
        res.status(400).json(error)
    } else {
        next()
    }
}
