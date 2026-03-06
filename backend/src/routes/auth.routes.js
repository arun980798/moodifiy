const { Router } = require("express");
const authcontroller = require("../controller/auth.controller")
const authmiddleware = require("../middleware/auth.middleware")
const router = Router();

router.post("/rigster",authcontroller.rigsteruser)


router.post('/login',authcontroller.loginUser)

// ye usr ko uska data vapas degi jase id username email 
router.get("/getme",authmiddleware,authcontroller.getme)




module.exports =  router