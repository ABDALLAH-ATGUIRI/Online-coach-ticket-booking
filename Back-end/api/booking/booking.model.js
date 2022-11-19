import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    voyage: {
      type: Schema.Types.ObjectId,
      ref:"voyages",
      required: true
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref:"buses",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:"users",
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
