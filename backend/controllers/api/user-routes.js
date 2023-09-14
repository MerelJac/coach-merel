const router = require("express").Router();
// goes to folder / index file, not direct path
const { User } = require("../../models");
const jwt = require('jsonwebtoken')
require('dotenv').config()
// for JWT
const secret = process.env.JWT_SECRET;


// GET ALL users - works
router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

// CREATE new user - works 
router.post("/", async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    console.log("new user was created: " + newUser);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.json({message: error})
  }
});

// Login / Set Session
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    } 
    // validate password
    const validatePassword = await user.comparePassword(password) 

    if (!validatePassword) {
      return res.status(401).json({message: 'Invalid login'})
    } else {
      // issue token
      const payload = { user };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      })
      res.cookie('token', token, { httpOnly: true }).sendStatus(200)
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

// Validate logged In User
router.get("/me", (req, res) => {
  console.log("peanut butter");
  console.log("WE ARE HERE WE AREW HERE", req.session);
  // TODO req.session isnt persisting?
  try {
    let user = req.session.user;
    console.log("User: ", user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(err);
  }
});

module.exports = router;
