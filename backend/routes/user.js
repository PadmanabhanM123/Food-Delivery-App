const express = require('express');
const Users = require("../models/user.js")

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password,email,dob } = req.body;
  console.log("request body:",req.body);
  try {
    const newUser = await Users.create({ username, password,email,dob});
    console.log("newUser:",newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const {  password,email } = req.body;
    const user = await Users.findOne({ where: { password ,email} });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'login failed' });
    }
});

module.exports = router;
