import voyageController from "./voyage.controller.js";
import express from "express";
import auth from "../../middleware/adminTokenMiddlware.js";
const router = express.Router();

router.post("/", auth.checkToken , voyageController.createVoyage);
router.get("/", auth.checkToken  , voyageController.getAllVoyages);
router.get("/:id", auth.checkToken , voyageController.getOneVoyageById);
router.put("/:id", auth.checkToken  , voyageController.updateOneVoyage);
router.get("/search/:start/:end", voyageController.searchVoyage);

export default { router };
