const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    trim: true,
  },
   email: {
    type: String,
    required: true,
    trim: true,
  },
   password: {
    type: String,
    required: true,
    trim: true,
  },
   role: {
    type: String,
    required: false,
    default:'user',
    trim: true,
  },

})

module.exports = mongoose.model("user", userSchema);