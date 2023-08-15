import authors from "../models/Author.js";

class AuthorController {
  static listAuthors = (req, res) => {
    authors
      .find()
      .then((authors) => {
        res.status(200).json(authors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static findAuthorById = (req, res) => {
    const id = req.params.id;
    authors
      .findById(id)
      .then((author) => {
        res.status(200).send(author);
      })
      .catch((error) => {
        res.status(404).send({
          mensagem: `${error.message} - Autor com _id = ${id} não localizado.`,
          status: 404,
        });
      });
  };

  static createAuthor = (req, res) => {
    const author = new authors(req.body);

    author
      .save()
      .then(() => {
        res.status(201).send(author.toJSON());
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          mensagem: `${error.message} - falha ao cadastrar Autor.`,
          status: 500,
        });
      });
  };

  static updateAuthor = (req, res) => {
    const id = req.body._id;
    authors
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send({ mensagem: "Autor atualizado com sucesso" });
      })
      .catch((error) => {
        res.status(500).send({
          mensagem: `Não foi possível atualizar o autor. Motivo: ${error.message}`,
          status: 500,
        });
      });
  };

  static deleteAuthor = (req, res) => {
    const id = req.params.id;
    authors
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({
          mensagem: "Autor deletado com sucesso!",
          status: 200,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send({
          mensagem:
            "Não foi possível deletar o Autor. Motivo: Autor não encontrado.",
          status: 404,
        });
      });
  };
}

export default AuthorController;
