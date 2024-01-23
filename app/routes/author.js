const controller = require("../controllers/author");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", cacheNoStore, controller.listAuthors);
router.get("/:id", cacheNoStore, controller.getAuthor);
router.get("/getBooks/:id", cacheNoStore, controller.getBooksByAuthor);
router.patch("/:id", cacheNoStore, controller.changeAuthor);
router.post("/", cacheNoStore, controller.createAuthor);

module.exports = router;
