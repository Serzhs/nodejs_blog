import mongoose from "mongoose";
import { mongoConnection } from "../../dbConnect";

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export interface User {
  createdAt: number;
  username: string;
  password: string;
}

export default mongoConnection.model("user", userSchema);
