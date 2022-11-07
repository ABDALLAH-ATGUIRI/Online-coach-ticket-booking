import mongoose from "mongoose";

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
    }
  },
  { timestamps: true }
);

const Buses = mongoose.model("buses", busSchema);
export default { Buses };