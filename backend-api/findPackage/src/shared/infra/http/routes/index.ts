import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { pathsRoutes } from "./paths.routes";
import { routesRoutes } from "./routes.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.use("/users", usersRoutes);
router.use("/routes",routesRoutes);
router.use("/paths",pathsRoutes);
router.use(authenticateRoutes);

export { router };