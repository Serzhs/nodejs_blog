import mongoose from "mongoose";
import { mongoConnection } from "../../mongoConfig";

const UserSchema = new mongoose.Schema({
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

export interface UserType {
  createdAt: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

export default mongoConnection.model("user", UserSchema);
