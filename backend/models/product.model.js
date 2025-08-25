const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
    required: false,
  }],
  features: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  components: { type: [String], default: [] },
});

module.exports = mongoose.model("Product", ProductSchema);