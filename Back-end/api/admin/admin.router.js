import AdminController from "./admin.controller.js";
import express from "express";
// import auth from "../../../middleware/adminTokenMiddlware.js";
const router = express.Router();

router.post("/login", AdminController.login);

// router.post("/", AdminController.createAdmin);
// router.get("/", auth.checkToken, AdminController.getAllAdmins);
// router.get("/:id", auth.checkToken, AdminController.getOneAdminByAdminId);

export default { router };
