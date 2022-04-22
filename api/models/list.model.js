import mongoose from "mongoose";

const { Schema } = mongoose;

const favSchema = new Schema(
  {
    title: String,
    description: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

const listSchema = new Schema(
  {
    name: String,
    idUser: mongoose.SchemaTypes.ObjectId,
    favs: [favSchema],
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("Lists", listSchema, "lists");

export default List;
