import express from "express";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import cors from "cors";
import postsRouter from "./src/router/posts";
import commentsRouter from "./src/router/comments";
import "dotenv/config";
import { mongoConnection } from "./dbConnect";
import { configurePassport } from "./passportConfig";
import userRouter from "./src/router/users";
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

const MongoStore = connectMongo(session);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

const sessionsStore = new MongoStore({
    mongooseConnection: mongoConnection,
    collection: "sessions",
});

app.use(session({
    secret: process.env.SESSION_SECRET_CODE!,
    resave: false,
    saveUninitialized: true,
    store: sessionsStore,
    cookie: {
        secure: false
    }
}))

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
