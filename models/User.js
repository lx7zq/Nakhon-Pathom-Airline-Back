const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstNameTH: { type: String, required: true },
    lastNameTH: { type: String, required: true },
    firstNameEN: { type: String, required: true },
    lastNameEN: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
