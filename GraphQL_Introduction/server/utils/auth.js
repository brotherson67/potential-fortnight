const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    // alsows toke to be sent via req.body, req.query, headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "bearer" from <tokenvalue>
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // if there is not a token, return req obj as is
    if (!token) {
      return req;
    }

    try {
      // to decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid Token");
    }

    // return update requrest object
    console.log("Approved");
    return req;
  },
};
