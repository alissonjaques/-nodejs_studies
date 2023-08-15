import express from "express";
import AuthorController from "../controllers/AuthorController.js";

const router = express.Router();

router.get("/authors", AuthorController.listAuthors);
router.get("/authors/:id", AuthorController.findAuthorById);
router.post("/authors", AuthorController.createAuthor);
router.put("/authors", AuthorController.updateAuthor);
router.delete("/authors/:id", AuthorController.deleteAuthor);

export default router;
