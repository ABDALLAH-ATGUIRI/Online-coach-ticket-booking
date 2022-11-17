import citiesController from "./cities.controller.js";
import express from "express";

const router = express.Router();

router.get("/", citiesController.getAll);

export default { router };
