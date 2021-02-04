import express from 'express';
import passport from "passport";
import {getUser, loginUser, registerUser, logoutUser} from "../controllers/user";
import {configurePassport} from "../../passportConfig";
import {getUserRegistrationValidation} from "../validation/users";

configurePassport(passport);

const userRouter = express.Router();

userRouter.get('/', getUser)

userRouter.get('/logout', logoutUser)

userRouter.post("/register", getUserRegistrationValidation, registerUser);

userRouter.post("/login", passport.authenticate("local"), loginUser);

export default userRouter;
