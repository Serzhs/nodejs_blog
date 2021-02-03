import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user";

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
    res.status(200).send(newUser);
  });
};

export const loginUser = async (req: Request, res: Response) => {
  res.send(`Logged In as ${req.user}`);
}
export const getUser = async (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.send("Nav aktīva usera");
    }
}
