const tapController = require("../controllers/tapController");
const router = require("express").Router();

router.post("/", tapController.addTap);
router.get("/", tapController.getAllTap);
module.exports = router;