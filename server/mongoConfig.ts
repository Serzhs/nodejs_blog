import mongoose, { Error } from "mongoose";

// Izveidojam connection uz mongo DB
export const mongoConnection = mongoose.createConnection(process.env.DB_HOST!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
