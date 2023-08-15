import books from "../models/Book.js";

class BookController {
  static listBooks = (req, res) => {
    books
      .find()
      .populate("autor")
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
      .populate("autor", "nome")
      .then((book) => {
        res.status(200).send(book);
      })
      .catch((error) => {
        res.status(404).send({
          mensagem: `${error.message} - Livro com _id = ${id} não localizado.`,
          status: 404,
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
        res.status(500).send({
          mensagem: `${error.message} - falha ao cadastrar livro.`,
          status: 500,
        });
      });
  };

  static updateBook = (req, res) => {
    const id = req.body._id;
    books
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send({ mensagem: "Livro atualizado com sucesso" });
      })
      .catch((error) => {
        res.status(500).send({ mensagem: error.message, status: 500 });
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
