import database from "../../config/database.js";
import mongoose from "mongoose";
database.pool();
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    Id_voyage: {
      type: String,
      required: true
    },
    bus: {
      type: String,
      required: true
    },
    Id_user: {
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
    departure_time: {
      type: timestamps,
      required: true
    },
    arrival_time: {
      type: timestamps,
      required: true
    },
    seat_number: {
      type: Number,
      required: true
    },
    prix: {
      type: Double,
      required: true
    }
  },
  { timestamps: true }
);

const Bookings = mongoose.model("bookings", bookingSchema);
export default { Bookings };
