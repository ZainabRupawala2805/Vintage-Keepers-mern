const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    phone: {type: String, default: ''},
    address: {
      street: {type: String, default: ''},
      city: {type: String, default: ''},
      state: {type: String, default: ''},
      zip: {type: String, default: ''},
      country: {type: String, default: ''},
    },
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  role: { type: String, default:'user' },
  isDeleted: { type: Boolean, default: false }, // For soft deletion
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
