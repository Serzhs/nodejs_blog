import "dotenv/config";
import mongoose from "mongoose";

export const mongoConnection = mongoose.createConnection(process.env.DB_HOST!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
