import voyageController from "./voyage.controller.js";
import express from "express";
import auth from "../../auth/token_validation.js";
const router = express.Router();

router.post("/", voyageController.createVoyage);
router.get("/", voyageController.getAllVoyages);
router.get("/:id", voyageController.getOneVoyageById);
router.put("/:id", voyageController.updateOneVoyage);
router.get("/search/:start/:end", voyageController.searchVoyage);

export default { router };
