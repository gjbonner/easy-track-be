const { Router } = require("express");
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // validate user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const emailExists = await User.findOne({ email: req.body.email });
  const usernameExists = await User.findOne({ username: req.body.username });
  if (emailExists) {
    return res.status(400).send("Account with that email already exists");
  } else if (usernameExists) {
    return res.status(400).send("Account with username already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(res.statusCode).send({ user: user._id });
  } catch (error) {
    res.status(res.statusCode).send(error);
  }
});

router.post("/login", async (req, res) => {
  // validate user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invald email or password.");

  //create JWT Token
  const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);
});

module.exports = router;
