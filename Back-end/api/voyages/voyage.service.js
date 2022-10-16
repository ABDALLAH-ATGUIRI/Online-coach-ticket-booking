import voyageModel from "./voyage.model.js";

export default {
  create: (data) => {
    return voyageModel.voyage.create(data);
  },
  list: (email) => {
    return voyageModel.voyage.findOne({ email: email });
  },
  getUserById: (id) => {
    return voyageModel.voyage.findById(id);
  }
};
