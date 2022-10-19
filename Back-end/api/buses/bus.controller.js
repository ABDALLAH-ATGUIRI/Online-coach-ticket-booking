import busServes from "./bus.service.js";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default {
  createBus: (req, res) => {
    const body = req.body;
    busServes.list(body.busNumber).then((bus, error) => {
      if (bus) {
        return res.json({
          error: "Bus",
          message: "This bus already exists"
        });
      } else {
        busServes.create(body).then((results, err) => {
          if (results) {
            res.status(200).json({
              success: 1,
              message: "Data inserted Successfully...",
              data: results
            });
          } else {
            res.json({
              success: 0,
              message: "Failed to insert Data..."
            });
          }
          if (err) {
            res.json({
              success: 0,
              message: error
            });
          }
        });
      }
    });
  },
  getOneBusById: (req, res) => {
    const id = req.params.id;
    busServes.list(id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!results) {
        return results.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getAllBuses: async (req, res) => {
    const results = await busServes.getAllBuses();
    return res.json({
      success: 1,
      data: results
    });
  },
  updateOneBus: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    busServes.updateBus(id, body).then((results, error) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!results) {
        return results.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: "َAlready updated"
      });
    });
  }
};
