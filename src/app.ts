import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { usersRoutes, loginRoutes } from "./routes";

const app: Application = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

export default app;
