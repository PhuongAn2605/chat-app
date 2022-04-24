const { register, login, setAvatar, getAllUsers, logout } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.post('/allUsers', getAllUsers);
router.post('/logout', logout)


module.exports = router;