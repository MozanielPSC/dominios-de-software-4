import { Router } from "express";
import multer from "multer";
import { CreatePathController } from "../../../../modules/steps/useCases/createPath/CreatePathController";
import { DeletePathController } from "../../../../modules/steps/useCases/deletePath/DeletePathController";
import { GetPathsByRouteIdController } from "../../../../modules/steps/useCases/getPathsByRouteId/GetPathsByRouteIdController";
import { UpdatePathController } from "../../../../modules/steps/useCases/updatePath/UpdatePathController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureEnterprise } from "../middlewares/ensureEnterprise";
const pathsRoutes = Router();
const createPathController = new CreatePathController();
const getPathsByRouteIdController = new GetPathsByRouteIdController();
const updatePathController = new UpdatePathController();
const deletePathController = new DeletePathController();
pathsRoutes.post("/",ensureAuthenticated,ensureEnterprise,createPathController.handle);
pathsRoutes.get("/byRoute/:route_id",getPathsByRouteIdController.handle);
pathsRoutes.patch("/",ensureAuthenticated,ensureEnterprise,updatePathController.handle);
pathsRoutes.delete("/:path_id",ensureAuthenticated,ensureEnterprise,deletePathController.handle)
export { pathsRoutes };