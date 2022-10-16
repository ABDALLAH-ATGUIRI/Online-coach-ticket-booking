import bookingModel from "./booking.model.js";

export default {
  create: (data) => {
    return bookingModel.booking.create(data);
  },
  list: (email) => {
    return bookingModel.booking.findOne({ email: email });
  },
  getUserById: (id) => {
    return bookingModel.booking.findById(id);
  }
};
