const jwt = require('jsonwebtoken');

var signToken = (user) => {
  return jwt.sign({ user.username, user.email }, user._id.toString());
}

var verifyToken = (user, token) => {
  try {
    var decoded = jwt.verify(token, user._id.toString());
    return (user.username == decoded.username && user.email && decoded.email);
  } catch (err) {
    console.log(err);
    return false;
  }
}
