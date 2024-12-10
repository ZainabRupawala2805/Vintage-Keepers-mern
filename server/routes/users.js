const express = require("express");
const cors = require("cors");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserData,
  cartUpdateUser,
  wishlistUpdateUser,
  getcartlist,

} = require("../controllers/Users/usersController");

const { authenticate, authorize } = require("../middlewares/auth");

const route = express.Router();

// Public Route
route.get("/", (req, res) => {
  res.status(200).send({ status: "ok", message: "working..." });
});

// Public Routes
route.post("/register", cors(), registerUser); // Registration does not need authentication
route.post("/login", cors(), loginUser); // Login does not need authentication


// Protected Routes
route.get("/detail", cors(), authenticate, getUserData);
route.put("/update", cors(), authenticate, updateUser); // Only authenticated users can update
route.post("/cart", cors(), authenticate, cartUpdateUser); // Only authenticated users can update
route.post("/wishlist", cors(), authenticate, wishlistUpdateUser); // Only authenticated users can update
route.get("/getcartlist", cors(), authenticate, getcartlist); // Only authenticated users can update
route.delete("/delete", cors(), authenticate, authorize(["admin"]), deleteUser); // Only admins can delete users

module.exports = route;
