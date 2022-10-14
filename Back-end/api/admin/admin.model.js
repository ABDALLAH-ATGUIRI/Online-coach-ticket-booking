import database from "../../config/database.js";
import mongoose from "mongoose";
database.pool();
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
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
export default { Admin };
