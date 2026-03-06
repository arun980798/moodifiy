const usermodel = require("../mdoels/user.model");
const jwt = require("jsonwebtoken");



async function authuser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token is not present ",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      message: "invalid token or token expied",
    });
  }
}

module.exports = authuser;
