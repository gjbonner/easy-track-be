const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // check for token
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
