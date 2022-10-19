import busModel from "./bus.model.js";

const Buses = busModel.Buses;
export default {
  create: (data) => {
    return Buses.create(data);
  },
  list: (busNumber) => {
    return Buses.findOne({ busNumber: busNumber });
  },
  getBusById: (id) => {
    return Buses.findById(id);
  },
  getAllBuses: () => {
    return Buses.find();
  },
  updateBus: (id, data) => {
    return Buses.findByIdAndUpdate(id, data);
  },
  deleteBus: (id) => {
    return Buses.deleteOne(id, data);
  }
};
