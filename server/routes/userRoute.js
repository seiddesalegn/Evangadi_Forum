const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// user controllers import
const { register, login, checkUser, reset } = require("../controller/userController");

// register route
router.post("/register", register);

// login route
router.post("/login", login);

//reset password
router.delete("/delete", reset);


// check user
router.get("/check", authMiddleware, checkUser);


module.exports = router;
