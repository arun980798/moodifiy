

const mongoose = require("mongoose")


const connecttodb  = async ()=>{
  mongoose.connect(process.env.MONGODB_URI)
 .then(()=>{
console.log("connected")
 })
 .catch((err)=>{
  console.log(err)
  console.log(process.env.MONGODB_URI)
 })
}



module.exports= connecttodb