import {NextFunction, Request, Response} from "express";
import {User} from "../models/user";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.isAuthenticated()) {
        res.status(401).json('not Authenticated')
    }

    const user = req.user as User

    if(!user?.isAdmin) {
        res.status(401).json('No Permissions')
    }

    next()
}
