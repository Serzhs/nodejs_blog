import bcrypt from "bcryptjs";
import passport from "passport";
import localStrategy from "passport-local";
import UserModel from "./src/models/user";

const LocalStrategy = localStrategy.Strategy;

const verifyCallBack = async (
    username: string,
    password: string,
    done: any
  ) => {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isValid = await bcrypt.compare(password, user.password);


    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }

  };

const strategy = new LocalStrategy(verifyCallBack);

export const configurePassport = (pass: typeof passport) => {
  pass.use(strategy);

  pass.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  pass.deserializeUser((userId: string, done: any) => {
    UserModel.findOne({ _id: userId }, (err: any, user: any) => {
      done(err, user);
    });
  });

};
