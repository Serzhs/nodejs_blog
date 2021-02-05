import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel, {User} from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, passwordConfirm } = req.body;

  UserModel.findOne({ username }, async (error: Error, doc: Document | null ) => {

    if (error) {
      res.send({ error });
      return;
    }

    if (doc) {
      res.send(`username already exists.`);
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).send('Successs');
  });
};

export const loginUser = async (req: Request, res: Response) => {
  res.send(req.user);
}

export const logoutUser = async (req: Request, res: Response) => {
    req.logout();
    res.json('Logged out')
}

export const getUser = async (req: Request, res: Response) => {
    const user = req.user as User

    if(user) {
        user.password = ''
        res.status(200).json(user);
    } else {
        res.send(undefined);
    }
}
