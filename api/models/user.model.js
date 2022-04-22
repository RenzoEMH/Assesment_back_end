import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", usersSchema, "users");

export default User;
