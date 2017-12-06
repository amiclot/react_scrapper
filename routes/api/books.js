const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .get(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);
// Matches with "/api/books/saved"
router
  .route("/saved")
  .get(booksController.findAllSaved)
  .post(booksController.save);

module.exports = router;
