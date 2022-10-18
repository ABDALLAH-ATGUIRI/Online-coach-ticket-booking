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
    departure_time: {
      type: Date,
      required: true
    },
    arrival_time: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const Voyages = mongoose.model("voyages", voyageSchema);
export default { Voyages };
