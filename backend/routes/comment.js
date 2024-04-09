const commentController = require("../controllers/commentController");
const router = require("express").Router();

// Đặt route POST cho việc thêm comment
router.post("/", commentController.addComment);
router.get("/", commentController.getComments);
module.exports = router;
