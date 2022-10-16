import busModel from "./bus.model.js";

export default {
  create: (data) => {
    return busModel.Buses.create(data);
  },
  list: (busNumber) => {
    return busModel.Buses.findOne({ busNumber: busNumber });
  },
  getUserById: (id) => {
    return busModel.Buses.findById(id);
  }
};
