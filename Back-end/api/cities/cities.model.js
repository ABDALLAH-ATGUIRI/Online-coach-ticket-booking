import mongoose from "mongoose";

const Schema = mongoose.Schema;
const citiesSchema = new Schema(
  {
    region_id: {
      type: String,
      required: true
    },
    names: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

const Cities = mongoose.model("cities", citiesSchema);
export default { Cities };
