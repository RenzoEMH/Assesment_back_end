import express from "express";
import { userCtlr } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const { login, registerUser, getAllUsers } = userCtlr;

const router = express.Router();

const userRoutes = {
  LOGIN: "/auth/local/login",
  GET_ALL: "/user",
  REGISTER: "/user/register",
};

router.post(userRoutes.LOGIN, login);
router.get(userRoutes.GET_ALL, validateToken, getAllUsers);
router.post(userRoutes.REGISTER, registerUser);
export default router;
