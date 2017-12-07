const router = require("express").Router();
const bookRoutes = require("./books");
const savedRoutes = require("./saved");
const scrapeRoutes = require("./scrape");

// Book routes
router.use("/books", bookRoutes);
router.use("/saved", savedRoutes);
router.use("/scrape", scrapeRoutes);


module.exports = router;
