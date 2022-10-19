import database from "../../config/database.js";
import mongoose from "mongoose";
database.pool();
const Schema = mongoose.Schema;
const busSchema = new Schema(
  {
    bus: {
      type: String,
      required: true
    },
    busNumber: {
      type: String,
      required: true
    },
    seatsNumber: {
      type: Intl,
      required: true
    },
    breakpoints: {
      type: Array,
      required: false,
      default: []
    }
  },
  { timestamps: true }
);

const Buses = mongoose.model("buses", busSchema);
export default { Buses };