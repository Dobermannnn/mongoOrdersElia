const controller = require("../controllers/book");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", cacheNoStore, controller.listBooks);
router.delete("/:id", cacheNoStore, controller.deleteBook);
router.get("/title/:title", cacheNoStore, controller.getBookByTitle);
router.get("/genere/:genre", cacheNoStore, controller.getBookByGenre);
router.get("/yearRange", cacheNoStore, controller.getBookByYear);
router.get("/author/:country", cacheNoStore, controller.getBookByAutorCountry);
router.post("/", cacheNoStore, controller.createBook);
module.exports = router;
