const storyController = require("../controllers/storyController")
const router = require("express").Router();

router.post("/", storyController.addStory);
router.get("/", storyController.getStory);
router.get("/:id", storyController.getAnStory);
router.get("/:id", storyController.getTapAnStory);
router.put("/:id",storyController.updateStory);
router.delete("/:id",storyController.deleteStory);
module.exports = router;