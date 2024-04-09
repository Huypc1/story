const replyController = require("../controllers/replyController");
const router = require("express").Router();

// Đặt route POST cho việc thêm comment
router.post("/", replyController.addReply);
router.get("/", replyController.getReply);
module.exports = router;
