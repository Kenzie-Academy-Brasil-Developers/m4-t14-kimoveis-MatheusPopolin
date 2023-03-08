import { Router } from "express";
import { loginController } from "../controllers";
import { ensureDataIsValid } from "../middlewares";

import { loginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValid(loginSchema), loginController);

export default loginRoutes;
