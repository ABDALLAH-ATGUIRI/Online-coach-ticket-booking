import express from "express";
import userRouter from "./api/users/user.router.js";
import adminRouter from "./api/admin/admin.router.js";
import busRouter from "./api/buses/bus.router.js";
import voyageRouter from "./api/voyages/voyage.router.js";

const app = express();
app.use(express.json());

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

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT : ", process.env.APP_PORT);
});
