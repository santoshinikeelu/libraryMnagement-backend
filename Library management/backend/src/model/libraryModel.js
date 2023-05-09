const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      default: "available",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
