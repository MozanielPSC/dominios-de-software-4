import { Router } from "express";
import multer from "multer";
import { StartRouteController } from "../../../../modules/steps/useCases/startRoute/StartRouteController";
import { CreateRouteController } from "../../../../modules/steps/useCases/createRoute/CreateRouteController";
import { DeleteRouteController } from "../../../../modules/steps/useCases/deleteRoute/DeleteRouteController";
import { GetRouteByDriverIdController } from "../../../../modules/steps/useCases/getRouteByDriverId/GetRouteByDriverIdController";
import { GetRouteByIdController } from "../../../../modules/steps/useCases/getRouteById/GetRouteByIdController";
import { GetAllRoutesController } from "../../../../modules/steps/useCases/getAllRoutes/GetAllRoutesController";
import { GetRouteByEnterpriseIdController } from "../../../../modules/steps/useCases/getRoutesByEnterpriseId/GetRouteByEnterpriseIdController";
import { UpdateRouteController } from "../../../../modules/steps/useCases/updateRoute/UpdateRouteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureEnterprise } from "../middlewares/ensureEnterprise";

const routesRoutes = Router();
const startRouteController = new StartRouteController();
const createRouteController = new CreateRouteController();
const getRouteByDriverIdController = new GetRouteByDriverIdController();
const getRouteByIdController = new GetRouteByIdController();
const getAllRoutesController = new GetAllRoutesController();
const getRouteByEnterpriseIdController = new GetRouteByEnterpriseIdController();
const deleteRouteController = new DeleteRouteController();
const updateRouteController = new UpdateRouteController();

routesRoutes.post("/", ensureAuthenticated, ensureEnterprise, createRouteController.handle);
routesRoutes.get("/:route_id", ensureAuthenticated, getRouteByIdController.handle)
routesRoutes.patch("/start", ensureAuthenticated, startRouteController.handle)
routesRoutes.get("/routes/all", ensureAuthenticated, getAllRoutesController.handle)
routesRoutes.get("/byDriver/:driver_id", ensureAuthenticated, getRouteByDriverIdController.handle);
routesRoutes.get("/byEnterprise/:enterprise_id", ensureAuthenticated, getRouteByEnterpriseIdController.handle);
routesRoutes.delete("/:route_id", ensureAuthenticated, ensureEnterprise, deleteRouteController.handle);
routesRoutes.patch("/:route_id", ensureAuthenticated, ensureEnterprise, updateRouteController.handle)

export { routesRoutes }