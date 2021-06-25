const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    const us = await user.save();
    console.log(us);

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_KEY);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Email already registered" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email & password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "Email not found" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.AUTH_KEY);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

});

module.exports = router;
