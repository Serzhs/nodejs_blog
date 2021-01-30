import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import cors from "cors";
import postsRouter from "./src/router/posts";
import commentsRouter from "./src/router/comments";
import "dotenv/config";
import { registerUser } from "./src/controllers/user";
import { mongoConnection } from "./mongoConfig";
import { configurePassport } from "./passportConfig";
import { UserType } from "./src/models/user";

// sagatavo session, lai varētu to sakonektēt ar mongoDB
const MongoStore = connectMongo(session);

const app = express();
const PORT = 8000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

const sessionsStore = new MongoStore({
  mongooseConnection: mongoConnection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET_CODE!,
    resave: false,
    saveUninitialized: true,
    store: sessionsStore,
    cookie: {
      maxAge: 1000, // ms
    },
  })
);

// inicializē passport middleware. Te ir black magic vēl padaudz
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not Logged In" });
  }
};

app.post("/register", registerUser);

app.post("/login", passport.authenticate("local"), (req, res) => {
  const activeUser = req.user as UserType;
  res.send(`Logged In as ${activeUser.username}`);
});

app.get("/", (req, res) => {
  res.send("work in progress");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
