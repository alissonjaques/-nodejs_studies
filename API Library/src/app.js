import express from "express";

const app = express();
app.use(express.json());

const books = [
  { id: 1, titulo: "Senhor dos Anéis" },
  { id: 2, titulo: "O Hobbit" },
  { id: 3, titulo: "Harry Potter e a Ordem da Fênix" },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

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
