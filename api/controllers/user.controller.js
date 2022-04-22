import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

export const login = async (request, response) => {
  const { email, password } = request.body;
  const user = await User.find({ email });
  const userDB = user[0];
  if (user.length === 0)
    return response.status(403).send({ message: "Email doesn't exist" });
  bcrypt.compare(password, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid) {
      jwt.sign(
        { email: userDB.email, id: userDB._id, type: userDB.type },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            response.status(200).json({
              token,
              message: "success",
            });
          } else {
            response.status(500).send({ message: "Internal server error" });
          }
        }
      );
    } else {
      response.status(403).send({ message: "Invalid password or email" });
    }
  });
};
export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users.length === 0)
      response.status(204).send({ message: "users not fund" });
    else response.status(200).json({ message: "success", users });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const registerUser = async (request, response) => {
  const { password, email } = request.body;
  if (!email) {
    return response.status(400).send({
      message: "Email is a mandatory field",
    });
  } else {
    const user = await User.findOne({ email });
    if (user)
      return response.status(400).send({
        message: "Email already registered",
      });
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return response.status(400).send({
        message:
          "Password must contain 8 characters including numbers, capital letters and special characters",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ ...request.body, password: hash });
    try {
      newUser.save();
      newUser && response.status(201).json({ newUser, message: "Success" });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
};
