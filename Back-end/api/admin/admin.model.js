import mongoose from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: false
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "admin",
      required: true
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);

export default { Admin };
