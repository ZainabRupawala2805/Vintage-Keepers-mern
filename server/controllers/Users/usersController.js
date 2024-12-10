const bcrypt = require("bcrypt");
const User = require("../../models/Users/usersModel");
const jwt = require("jsonwebtoken");
const itemsModel = require("../../models/itemsModel");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const newUser = new User({
      profile: { firstName, lastName },
      username,
      email,
      passwordHash: hashedPassword,
    });

    await newUser.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ message: "Email or Username already exists" });
    }
    res.status(500).send({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Include role in token payload
    const token = jwt.sign(
      { userId: user._id, role: user.role || "user" },
      "AshishIngle29",
      { expiresIn: "1h" }
    );

    res.status(200).send({ message: "Login successful", token, data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

// Fetch User Data
const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract userId from the authenticated user
    const user = await User.findById(userId, "-passwordHash -isDeleted").populate({
      path: "cart.productId",
      model: "Item",
    }).populate("wishlist");; // Exclude sensitive fields like password and isDeleted

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      message: "User data retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { profile, cart, wishlist } = req.body;

    const user = await User.findOne({ _id: userId, isDeleted: false });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (profile) user.profile = { ...user.profile, ...profile };
    if (cart) user.cart = cart; // Replace cart with the provided one
    if (wishlist) user.wishlist = wishlist; // Replace wishlist

    user.updatedAt = new Date();

    await user.save();

    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

const cartUpdateUser = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).send({ message: "Product ID is required" });
  }

  try {
    const user = await User.findById(req.user.userId); // `req.user` contains authenticated user data

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if product exists
    const product = await itemsModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if product is already in cart
    const productInCart = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (productInCart) {
      productInCart.quantity += 1; // Increment quantity if already in cart
    } else {
      user.cart.push({ productId, quantity: 1 }); // Add new product to cart
    }

    await user.save();
    res.status(200).send({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

const wishlistUpdateUser = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).send({ message: "Product ID is required" });
  }

  try {
    const user = await User.findById(req.user.userId); // `req.user` contains authenticated user data

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if product exists
    const product = await itemsModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).send({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId); // Add product to wishlist
    await user.save();

    res
      .status(200)
      .send({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

const getcartlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user by ID and populate cart and wishlist
    const user = await User.findById({_id: userId})
      .populate({
        path: "cart.productId",
        model: "Item",
      })
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Cart and wishlist data retrieved successfully",
      // cart: user.cart.map((item) => ({
      //   product: item.productId,
      //   quantity: item.quantity,
      // })),
      cart: user.cart,
      wishlist: user.wishlist,
    });
    
  } catch (error) {
    console.error("Error fetching cart and wishlist data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { isDeleted: true, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
  getUserData,
  cartUpdateUser,
  wishlistUpdateUser,
  getcartlist
};
