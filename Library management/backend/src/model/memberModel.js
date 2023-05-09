const mongoose = require("mongoose");
const libraryModel = require("../model/libraryModel");

const memberSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 15,
    },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    
    isDeleted: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", memberSchema);
