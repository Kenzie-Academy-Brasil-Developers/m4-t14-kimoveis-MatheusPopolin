import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import {
  usersRoutes,
  loginRoutes,
  categoriesRoutes,
  realEstateRoutes,
  schedulesRoutes,
} from "./routes";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);

export default app;
