const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/scrape"
router.route("/")
	.get(booksController.create);

module.exports = router;
