import busController from "./bus.controller.js";
import express from "express";
import auth from "../../middleware/adminTokenMiddlware.js";
const router = express.Router();

router.post("/", auth.checkToken ,busController.createBus);
router.get("/", auth.checkToken , busController.getAllBuses);
router.get("/:id",auth.checkToken , busController.getOneBusById);
router.put("/:id",auth.checkToken , busController.updateOneBus);

export default { router };
