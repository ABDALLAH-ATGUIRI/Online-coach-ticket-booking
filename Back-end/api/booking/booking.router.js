import bookingController from "./booking.controller.js";
import express from "express";
import auth from "../../middleware/adminTokenMiddlware.js";
const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:id",  bookingController.getOneBookingById);

export default { router };
