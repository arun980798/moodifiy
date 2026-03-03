

const mongoose = require("mongoose")


const connecttodb  = async ()=>{
  mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
console.log("connected")
 })
 .catch((err)=>{
  console.log(process.env.MONGO_URI)
 })
}



module.exports= connecttodb