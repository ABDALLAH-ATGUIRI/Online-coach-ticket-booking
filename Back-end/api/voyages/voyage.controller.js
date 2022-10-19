import voyageServes from "./voyage.service.js";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default {
  createVoyage: (req, res) => {
    const body = req.body;

    // get values of trips
    body.Trips = createTrips(body);

    voyageServes.create(body).then((results, err) => {
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
  },
  getOneVoyageById: (req, res) => {
    const id = req.params.id;
    voyageServes.list(id, (error, results) => {
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
  getAllVoyages: async (req, res) => {
    const results = await voyageServes.getAll();
    return res.json({
      success: 1,
      data: results
    });
  },
  updateOneVoyage: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.Trips = createTrips(body);
    voyageServes.updateVoyage(id, body).then((results, error) => {
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
  },
  searchVoyage: async (req, res) => {
    const trip = [req.params.start, req.params.end];
    const results = await voyageServes.getAll();
    const voyages = [];
    results.map((res) => {
      for (const key in res.Trips) {
        const element = res.Trips[key];

        if (element.departure_station == trip[0]) {
          let i = key;
          do {
            voyages.push(res.Trips[i]);
            i++;
          } while (res.Trips[i - 1].arrival_station != trip[1]);
        }
      }

      const obj = {
        id_voyage: res._id,
        start: voyages[0].departure_station,
        end: voyages[voyages.length - 1].arrival_station,
        prix: 10
      };
      console.log(obj)
    });
  }
};

/**
 * Create the information of brick points
 * @param {*} data => voyage
 * @returns
 */
const createTrips = (data) => {
  const obj = [];
  const newBody = data.breaking_point;
  newBody.unshift(data.depart_station);
  newBody.push(data.arrival_station);

  for (let i = 1; i < newBody.length; i++) {
    obj.push({
      departure_station: newBody[i - 1],
      arrival_station: newBody[i],
      entry_time: data.Trips[i - 1].entry_time || "",
      exit_time: data.Trips[i - 1].exit_time || "",
      prix: data.Trips[i - 1].prix || ""
    });
  }
  return obj;
};
