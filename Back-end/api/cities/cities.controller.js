import citiesServes from "./cities.service.js";

export default {
  getAll: async (req, res) => {
    const results = await citiesServes.getAll();
    return res.json({
      success: 1,
      data: results
    });
  }
};
