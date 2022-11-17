import mongoose from "mongoose";

const Schema = mongoose.Schema;
const voyageSchema = new Schema(
  {
    bus: {
      type: Schema.Types.ObjectId,
      ref: "buses",
      required: true
    },
    depart_station: {
      type: String,
      required: true
    },
    arrival_station: {
      type: String,
      required: true
    },
    breaking_point: {
      type: Array,
      default: []
    },
    statut: {
      type: String,
      enum: ["inMaintenance", "OutOfService", "inService"],
      default: "OutOfService",
      required: true
    },
    Trips: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Voyages = mongoose.model("voyages", voyageSchema);
export default { Voyages };
