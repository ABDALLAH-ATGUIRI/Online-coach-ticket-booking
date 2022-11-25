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
    },
    statut: {
      type: String,
      enum: ["inMaintenance", "OutOfService", "inService"],
      default: "OutOfService",
      required: true
    },
    rule: {
      type: String,
      default: "ON",
    }
  },
  { timestamps: true }
);

const Buses = mongoose.model("buses", busSchema);
export default { Buses };
