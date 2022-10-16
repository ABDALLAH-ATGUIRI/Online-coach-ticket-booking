import busController from "./bus.controller.js";
import express from "express";
import auth from "../../auth/token_validation.js";
const router = express.Router();

router.post("/", busController.createBus);
router.get("/:id", busController.getOneBusById);
export default { router };
