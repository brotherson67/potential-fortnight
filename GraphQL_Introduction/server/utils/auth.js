const jwt = require("jsonwebtoken");

const secret = "mySuperSecret";
const expirtation = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expirtation });
  },
};
