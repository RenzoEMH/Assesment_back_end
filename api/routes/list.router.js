import express from "express";
import { listCtlr } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const {
  getAllLists,
  getOneList,
  deleteList,
  createList,
  addFavToList,
  getListsByUser,
} = listCtlr;

const router = express.Router();

const listRoutes = {
  GET_ALL: "/favs",
  GET_ONE: "/favs/:id",
  GET_LISTS_BY_USER: "/favs/user/:id",
  CREATE: "/favs",
  DELETE: "/favs/:id",
  ADD_FAV_TO_LIST: "/favs/:id",
};

router.get(listRoutes.GET_ALL, validateToken, getAllLists);
router.get(listRoutes.GET_ONE, validateToken, getOneList);
router.get(listRoutes.GET_LISTS_BY_USER, validateToken, getListsByUser);
router.post(listRoutes.CREATE, validateToken, createList);
router.put(listRoutes.ADD_FAV_TO_LIST, validateToken, addFavToList);
router.delete(listRoutes.DELETE, validateToken, deleteList);

export default router;
