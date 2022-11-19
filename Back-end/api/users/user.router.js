import UserController from "./user.controller.js";
import express from "express";
import auth from "../../middleware/userTokenMiddlware.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
// router.get("/", UserController.getAllUsers);
// router.get("/:id", , UserController.getOneUserByUserId);

export default { router };
