const { register, login, getUser } = require("./../controller/user.controller");
const express = require("express");
const router = express.Router();
const auth = require('./../config/auth')

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", auth, getUser);


module.exports = router;