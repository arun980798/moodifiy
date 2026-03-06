const mongoose = require("mongoose");

const blacklistschema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: [true, "token is require for blacklist "],
    },
  },
  {
    timestamps: true,
  },
);


const blacklistmodel = mongoose.model("blacklist", blacklistschema)


module.exports = blacklistmodel