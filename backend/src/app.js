const express = require("express");
const cookieparser = require("cookie-parser")





const app = express()
app.use(express.json())
app.use(cookieparser())


//routrs for all api 

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

module.exports = app