import mongoose from "mongoose";

const schemaBook = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

const books = mongoose.model("livros", schemaBook);

export default books;
