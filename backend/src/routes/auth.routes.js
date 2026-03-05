const { Router } = require("express");
const authcontroller = require("../controller/auth.controller")

const router = Router();

router.post("/rigster",authcontroller.rigsteruser)


router.post('/login',authcontroller.loginUser)







module.exports =  router