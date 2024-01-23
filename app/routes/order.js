const controller = require("../controllers/order");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", cacheNoStore, controller.allOrders);
router.post("/", cacheNoStore, controller.order);

router.get("/mostTotalPrice", cacheNoStore, controller.getMostTotalPrice);
router.get("/profit", cacheNoStore, controller.getProfit);

router.get("/mostPopularGenere", cacheNoStore, controller.getMostPopularGeners);

router.get("/mostBoughtAuthors", cacheNoStore, controller.getMostBoughtAuthors);

module.exports = router;
