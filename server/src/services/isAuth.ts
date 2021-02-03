import {NextFunction, Request, Response} from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(400).json({ msg: "Not Logged In" });
    }
};
