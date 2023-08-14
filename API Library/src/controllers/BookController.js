import books from "../models/Book.js";

class BookController {
  static listBooks = (req, res) => {
    books
      .find()
      .then((books) => {
        res.status(200).json(books);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static findBookById = (req, res) => {
    const id = req.params.id;
    books
      .findById(id)
      .then((book) => {
        res.status(200).send(book);
      })
      .catch((error) => {
        res.status(404).send({
          message: `${error.message} - Livro com _id = ${id} não localizado.`,
        });
      });
  };

  static createBook = (req, res) => {
    const book = new books(req.body);

    book
      .save()
      .then(() => {
        res.status(201).send(book.toJSON());
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send({ message: `${error.message} - falha ao cadastrar livro.` });
      });
  };

  static updateBook = (req, res) => {
    const id = req.body._id;
    books
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  };

  static deleteBook = (req, res) => {
    const id = req.params.id;
    books
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({
          mensagem: "Livro deletado com sucesso!",
          status: 200,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send({
          mensagem:
            "Não foi possível deletar o livro. Motivo: livro não encontrado.",
          status: 404,
        });
      });
  };
}

export default BookController;
