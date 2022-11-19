import bookingServes from "./booking.service.js";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default {
  createBooking: (req, res) => {
    const body = req.body;
    bookingServes.create(body).then((results, err) => {
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
  getOneBookingById: (req, res) => {
    const id = req.params.id;
    bookingServes.list(id, (error, results) => {
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
  getAllBookings: (req, res) => {
    bookingServes.getBooking((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }
};
