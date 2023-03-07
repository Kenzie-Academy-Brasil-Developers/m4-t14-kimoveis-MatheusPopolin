import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { usersRoutes } from "./routes/users.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(handleErrors);

export default app;
