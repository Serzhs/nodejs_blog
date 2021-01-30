import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user";
import Joi from "joi";

const joiUserSchemaValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(3).max(15).required(),

  passwordConfirm: Joi.any().valid(Joi.ref("password")).required(),
});

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, passwordConfirm } = req.body;

  const { error } = joiUserSchemaValidation.validate({
    username,
    password,
    passwordConfirm,
  });

  if (error) {
    res.send({ error });
    return;
  }

  UserModel.findOne({ username }, async (error: any, doc: any) => {

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
    res.status(200).send(`New User '${username}' registred succesfully!`);
  });
};
