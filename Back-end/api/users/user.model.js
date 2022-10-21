import mongoose from "mongoose";

const Schema = mongoose.Schema;
const usersSchema = new Schema(
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

const Users = mongoose.model("users", usersSchema);
export default { Users };
