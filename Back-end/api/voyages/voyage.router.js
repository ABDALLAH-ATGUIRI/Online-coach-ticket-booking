import voyageController from "./voyage.controller.js";
import express from "express";
import auth from "../../auth/token_validation.js";
const router = express.Router();

router.post("/", voyageController.createVoyage);
router.get("/", voyageController.getAllVoyages);
router.get("/:id", voyageController.getOneVoyageById);

export default { router };
