import express from "express";
import db from "./config/dbConnect.js";
import books from "./models/Book.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

routes(app);

app.get("/books/:id", (req, res) => {
  const index = getBook(req.params.id);
  if (index == -1) {
    res.status(404).send(`Livro de id = ${req.params.id} não encontrado!`);
  } else {
    res.status(200).json(books[index]);
  }
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/books/:id", (req, res) => {
  const index = getBook(req.params.id);
  if (index == -1) {
    res.status(404).send(`Livro de id = ${req.params.id} não encontrado!`);
  } else {
    books[index].titulo = req.body.titulo;
    res.status(204).json(books[index]);
  }
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const index = getBook(id);
  if (index == -1) {
    res.status(404).send(`Livro de id = ${req.params.id} não encontrado!`);
  } else {
    const book = books[index];
    books.splice(index, 1);
    res.status(200).json(book);
  }
});

function getBook(id) {
  return books.findIndex((book) => book.id == id);
}

export default app;
