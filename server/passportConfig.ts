import bcrypt from "bcryptjs";
import passport from "passport";
import localStrategy from "passport-local";
import UserModel from "./src/models/user";

const verifyCallBack = async (
    username: string,
    password: string,
    // tips?
    callback: any
  ) => {
    const user = await UserModel.findOne({ username });
    // Ja nav useris, tad izsaucam callbacku un padodam null un false.
    // null - nebija errors
    // false - neatrada useri
    try {
      if (!user) {
        return callback(null, false);
      }

      const isValid = await bcrypt.compare(password, user.password);

      // Ja parole ir pareiza, tad izsaucam callbacku un padodam null un user
      // null - nebija erroru
      // user - user objekts no datubāzes
      if (isValid) {
        return callback(null, user);
      } else {
        return callback(null, false);
      }
      // Ja ir errors no datubāzes, tad tiek izsaukts callback padodot erroru. passports zinās, kas jādara..
    } catch (err) {
      callback(err);
    }
  };


  // Izdara kaut ko... uztaisa jaunu stratēģiju, kurai iebaro laukus, kurus skatīt un pārbaudes funkciju.
// Laikam laukus var arī nedot, un tad būs defaultie?
const LocalStrategy = localStrategy.Strategy;
const strategy = new LocalStrategy(verifyCallBack);

export const configurePassport = (pass: typeof passport) => {
  pass.use(strategy);

  // uztaisa cookie ar iekļautu username
  pass.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  // atrod useri pēc cookie
  pass.deserializeUser((userId: string, done: any) => {
    UserModel.findOne({ _id: userId }, (err: any, user: any) => {
      done(err, user);
    });
  });

};
