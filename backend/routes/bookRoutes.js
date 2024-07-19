const express = require("express");
const { auth, isAuthor, isReader } = require("../middlewares/auth");
const { createBook, createChapter, setStatus, updateBook, updateChapter, searchBook, filterByStatusAndGenre, sortAccordingToPublishDateAndRating, getAllRating, listAllBooksViaPagination } = require("../controllers/Authorbook");
const { topRatedBooks, getAllBooksBySpecificAuthor, getBooksByGenre, getBooksByTitle, getFilterBooks, getBookDetails, getAllBooks } = require("../controllers/Readerbook");
const router = express.Router();


// Author Routes
router.post("/createBook", auth, isAuthor, createBook);
router.post("/createChapter", auth, isAuthor, createChapter);
router.post("/setStatus", auth, isAuthor, setStatus);
router.post("/updateBook", auth, isAuthor, updateBook);
router.post("/updateChapter", auth, isAuthor, updateChapter);
router.get("/searchBook", auth, isAuthor, searchBook);
router.get("/filter", auth, isAuthor, filterByStatusAndGenre)
router.get("/sort", auth, isAuthor, sortAccordingToPublishDateAndRating);
router.get("/getAllRating", auth, isAuthor, getAllRating);
router.post("/listAllBooks", auth, isAuthor, listAllBooksViaPagination);


// Reader Routes
router.get("/topRated", auth, isReader, topRatedBooks);
router.get("/getAuthorBooks", auth, isReader, getAllBooksBySpecificAuthor);
router.get("/getBooksByGenre", auth, isReader, getBooksByGenre);
router.get("/getBooksByTitle", auth, isReader, getBooksByTitle);
router.post("/getFilterBooks", auth, isReader, getFilterBooks)
router.get("/getBookDetails", auth, isReader, getBookDetails);
router.get("/getAllBooks", auth, isReader, getAllBooks);

module.exports = router;