const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const userModel = require("../model/user/userModel");



const masAge = 1 * 24 * 60 * 60;

exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: masAge,
  });
};

exports.createTokeMobile = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: "365d", // expires in 365 day
  });
};

exports.randomNum = (len) => {
  len = len || 100;
  var nuc = "0123456789";
  var i = 0;
  var n = 0;
  s = "";
  while (i <= len - 1) {
    n = Math.floor(Math.random() * 4);
    s += nuc[n];
    i++;
  }
  return s;
};


const d = Date.now();
exports.currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  d
);

exports.findUser = async (username, password) => {
  const user = await userModel.Users.findOne({
    // attributes: {exclude: ['password']},
    where: {
      [Op.or]: [{ username: username }, { email: username }],
    },
    raw: true,
  });

  // console.log({user, username, password})
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect username or password");
  }
  throw Error("Incorrect username or password");
};
