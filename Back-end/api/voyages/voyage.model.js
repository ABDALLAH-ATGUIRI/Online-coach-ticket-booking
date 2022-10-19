import database from "../../config/database.js";
import mongoose from "mongoose";
database.pool();
const Schema = mongoose.Schema;
const voyageSchema = new Schema(
  {
    Id_Bus: {
      type: String,
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
    Trips: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Voyages = mongoose.model("voyages", voyageSchema);
export default { Voyages };
