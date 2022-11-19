import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import database from "./config/database.js";
import userRouter from "./api/users/user.router.js";
import adminRouter from "./api/admin/admin.router.js";
import busRouter from "./api/buses/bus.router.js";
import voyageRouter from "./api/voyages/voyage.router.js";
import citiesRouter from "./api/cities/cities.router.js";
import AppError from "./helpers/appError.js";
import errorHandler from "./helpers/errorHandler.js";

database.pool();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "I am listening on port " + process.env.APP_PORT
  });
});

app.use("/api/users", userRouter.router);
app.use("/api/admin", adminRouter.router);
app.use("/api/bus", busRouter.router);
app.use("/api/voyage", voyageRouter.router);
app.use("/api/cities", citiesRouter.router);

app.all("*", (req, res, next) => {
  next(new AppError(`the url ${req.originalUrl} does not exist`, 404));
});

app.use(errorHandler.messageErr);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT : ", process.env.APP_PORT);
});
