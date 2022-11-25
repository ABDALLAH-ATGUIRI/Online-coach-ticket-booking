import busModel from "./bus.model.js";

const Buses = busModel.Buses;
export default {
  list: (id) => {
    return Buses.findOne({busNumber : id});
  },
  create: (data) => {
    return Buses.create(data);
  },

  getBusById: (id) => {
    return Buses.findById(id);
  },
  getAllBuses: () => {
    return Buses.find({ rule: "ON" });
  },
  getCountBuses: () => {
    return Buses.find({ rule: "ON" }).count();
  },
  updateBus: (id, data) => {
    return Buses.findByIdAndUpdate(id, data);
  },
  deleteBus: (id) => {
    return Buses.findByIdAndUpdate(id, { rule: "OFF" });
  }
};
