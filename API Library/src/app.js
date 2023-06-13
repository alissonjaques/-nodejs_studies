import express from "express";

const app = express();

const books = [
  { id: 1, titulo: "Senhor dos Anéis" },
  { id: 2, titulo: "O Hobbit" },
  { id: 3, titulo: "Harry Potter e a Ordem da Fênix" },
];

app.get("/", (req, resp) => {
  resp.status(200).send("Curso de Node");
});

app.get("/livros", (req, resp) => {
  resp.status(200).json(books);
});

export default app;
