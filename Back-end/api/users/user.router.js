import UserController from "./user.controller.js";
import express from "express";
import auth from "../../auth/token_validation.js";
const router = express.Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);


// router.get("/", auth.checkToken, UserController.getAllUsers);
// router.get("/:id", auth.checkToken, UserController.getOneUserByUserId);

export default { router };
