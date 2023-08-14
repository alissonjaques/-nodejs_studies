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
}

export default BookController;
