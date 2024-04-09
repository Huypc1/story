const authorController = require("../controllers/authorController");
const router = require("express").Router();

router.post("/", authorController.addAuthor);
router.get("/", authorController.getAuthor);
router.get("/:id",authorController.getAnAuthor);
router.put("/:id", authorController.updateAuthor);
module.exports = router;