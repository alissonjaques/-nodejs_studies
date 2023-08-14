import express from "express";
import BookController from "../controllers/BookController.js";

const router = express.Router();

router.get("/books", BookController.listBooks);
router.get("/books/:id", BookController.findBookById);
router.post("/books", BookController.createBook);
router.put("/books", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);

export default router;
