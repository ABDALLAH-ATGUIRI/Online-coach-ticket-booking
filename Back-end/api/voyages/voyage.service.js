import voyageModel from "./voyage.model.js";
const Voyages = voyageModel.Voyages;

export default {
  create: (data) => {
    return Voyages.create(data);
  },
  list: (id) => {
    return Voyages.findOne({ _id: id });
  },
  getAll: async () => {
    return await Voyages.find({}).populate('bus');
  },
  getVoyageById: (id) => {
    return Voyages.findById(id);
  },
  updateVoyage: (id, data) => {
    return Voyages.findByIdAndUpdate(id, data);
  },
  deleteVoyage: (id) => {
    return Voyages.deleteOne(id, data);
  }
};
