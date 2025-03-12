const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  frameData: {
    image: { type: String, required: true },
    size: { type: String, required: true },
    colors: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
