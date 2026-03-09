const redis = require("ioredis").default

const redisClient = new redis({
  host:process.env.REDIS_HOST,
  port:process.env.REDIS_PORT,
  password:process.env.REDIS_PASSWORD
})

redisClient.on("connect",()=>{
  console.log("redis is connected ")
})

redisClient.on("error",(err)=>{
  console.log(err)
})


module.exports = redisClient