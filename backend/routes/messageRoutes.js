const { addMessage, getAllMessages } = require("../controllers/messageController");
const { register, login, setAvatar, getAllUsers, logout } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessages);

module.exports = router;