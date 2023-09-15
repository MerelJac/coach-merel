const router = require("express").Router();
const withAuth = require("../../config/auth.config");
// goes to folder / index file, not direct path
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
// for env secret
require("dotenv").config();
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
    const newUser = await User.create(req.body);
    console.log("new user was created: " + newUser);
    // issue token
    if (!newUser) {
      res.json({ message: "Error creating user" });
    } else {
      const payload = { newUser };
      const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
      res.json(token);
    }
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

// Login / Set Session
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    // validate password
    const validatePassword = await user.comparePassword(password);

    if (!validatePassword) {
      return res.status(401).json({ message: "Invalid login" });
    } else {
      // issue token
      const payload = { user };
      const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
      res.json(token);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while logging in." });
  }
});

// check token /api/user-routes/checkToken
router.get("/checkToken", withAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
