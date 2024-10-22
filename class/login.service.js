const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Users = require("../model/user/userModel");
const valid = require("../lib/validation");

// var salt = bcrypt.genSaltSync(10);

class Auth {
  constructor() {
    this.Op = Sequelize.Op;
    this.users = Users;
    this.logiValidation = valid;
  }

  validation(body) {
    const { value, error } = this.logiValidation.login.validate(body);
    if (error) {
      throw Error(error.message);
    } else {
      return value;
    }
  }

  maxAge() {
    return 1 * 24 * 60 * 60;
  }

  jwtToken(userId) {
    console.log({id: process.env.JWT_SECRECT})
    return jwt.sign({ userId }, process.env.JWT_SECRECT, {
      expiresIn: this.maxAge(),
    });
  }

  async loginUser(body) {
    const data = this.validation(body);
    if (data) {
      const user = await this.findUser(data.username, data.password);
      const token = this.jwtToken(user.user.id);
      return {
        status: true,
        message: "Login",
        jwt: "jwt",
        token: token,
        user,
        data: { httpOnly: true, masAge: this.maxAge() * 1000 },
      };
    }
  }

  logOut() {
    return { maxAge: 1 };
  }

  async findUser(username, password) {
    // console.log({ username, password });
    const user = await this.users.findOne({
      where: { [this.Op.or]: [{ username: username }, { email: username }] },
      raw: true,
    });

    if (user) {
      //   console.log({ user });
      const auth = await this.comparePassword(password, user.password);
      //   console.log({ auth });
      if (auth) {
        return {
          status: true,
          user,
        };
      }
      throw Error("Invalid user or password");
    }
    throw Error("Invalid user or password");
  }

  async comparePassword(password, userPsw) {
    // console.log({ password, userPsw });
    try {
      return await bcrypt.compareSync(`${password}`, userPsw);
    } catch (error) {
      // console.log(error)
      throw Error("Invalid user or password");
    }
  }

  async changePassword(data) {
    const { value, error } = this.logiValidation.resetMyPasswordVal.validate(data);
    if (error) {
      throw Error(error.message);
    } else {
      const user = await this.findUser(data.username, data.old_passoerd);
      user.update(
        {
          password: await bcrypt.hash(value.password, saltRounds),
          inactive: 1,
        },
        { new: true }
      );
      return {
        status: "success",
        data: "You password has been changed!!",
      };
    }
  }
}

module.exports = Auth;
