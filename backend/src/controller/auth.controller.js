const usermodel = require("../mdoels/user.model");
const blacklistmodel = require("../mdoels/blacklist.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

async function rigsteruser(req, res) {
  const { username, email, password } = req.body;
  const isuseralradyrigster = await usermodel.findOne({
    $or: [{ email }, { username }],
  });
  if (isuseralradyrigster) {
    return res.status(400).json({
      message: " user is exist with same username or email ",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    },
  );
  res.cookie("token",token)


  return res.status(201).json({
    message:"user rigster done  ",
    user:{
      id:user._id,
      username: user.username,
      email: user.email
    }

  })
}

async function loginUser(req, res) {
    const { email, password, username } = req.body;

    const user = await usermodel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function getme(req,res) {
  const user  =await usermodel.findById(req.user.id)

  
  res.status(200).json({
    message:"user fetched done",user
  })
}


async function logout(req,res) {
  
  const token = req.cookie;



res.clearCookie("token")
 await redis.set(token,Date.now().toString())


  res.status(200).json({
    message:"logout done "
  })
}

module.exports = { rigsteruser , loginUser,getme,logout };
