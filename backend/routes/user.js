const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/",userController.addUser);
router.post("/login", userController.getLogin); 
module.exports = router;