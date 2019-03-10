
const express = require('express');

const router = express.Router();

const controllersuser =require("../controllers/user")

router.post('/signup',controllersuser.signup)

router.post("/login",controllersuser.login)

router.delete("/:userId",controllersuser.delete_user)













module.exports=router