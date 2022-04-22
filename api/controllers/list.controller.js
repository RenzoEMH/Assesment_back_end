import { List } from "../models/index.js";

export const getAllLists = async (request, response) => {
  try {
    const lists = await List.find();
    response.status(200).json({ lists, message: "success" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const getOneList = async (request, response) => {
  try {
    const { id } = request.params;
    const list = await List.findById(id);
    response.status(200).json({ list, message: "success" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const getListsByUser = async (request, response) => {
  try {
    const { id } = request.params;
    const lists = await List.find({ idUser: id });
    response.status(200).json({ message: "success", lists });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const createList = async (request, response) => {
  try {
    const list = new List(request.body);
    const newList = await list.save();
    newList && response.status(201).json({ message: "success", newList });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const addFavToList = async (request, response) => {
  try {
    const favToUpdate = request.body;
    const { id } = request.params;
    const listFound = await List.findById(id);
    if (listFound && favToUpdate) {
      listFound.favs.push(favToUpdate);
      listFound &&
        List.updateOne(
          { _id: listFound._id },
          listFound,
          null,
          (error, result) => {
            !error
              ? response.status(200).json({ message: "success", result })
              : response.status(500).send({ message: "Internal server error" });
          }
        );
    } else return response.status(204).json({ message: "List not found" });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
export const deleteList = async (request, response) => {
  try {
    const { id } = request.params;
    const listToDelete = await List.findById(id);
    if (!listToDelete) res.status(204).json({ message: "No list to delete" });
    else {
      const deletedList = await List.deleteOne({ _id: id });
      response.status(200).json({ message: "success", deletedList });
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
};
