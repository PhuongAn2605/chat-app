const { register, login, setAvatar, getAllUsers } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.get('/allUsers', getAllUsers);


module.exports = router;