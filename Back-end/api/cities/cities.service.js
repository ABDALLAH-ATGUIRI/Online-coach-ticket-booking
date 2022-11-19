import citiesModel from "./cities.model.js";

const Cities = citiesModel.Cities;
export default {
  getAll: () => {
    return Cities.find();
  }
};
