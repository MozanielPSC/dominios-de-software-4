import { Router } from "express";
import multer from "multer";
import { CreateRouteController } from "../../../../modules/steps/useCases/createRoute/CreateRouteController";
import { DeleteRouteController } from "../../../../modules/steps/useCases/deleteRoute/DeleteRouteController";
import { GetRouteByDriverIdController } from "../../../../modules/steps/useCases/getRouteByDriverId/GetRouteByDriverIdController";
import { GetRouteByIdController } from "../../../../modules/steps/useCases/getRouteById/GetRouteByIdController";
import { GetRouteByEnterpriseIdController } from "../../../../modules/steps/useCases/getRoutesByEnterpriseId/GetRouteByEnterpriseIdController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureEnterprise } from "../middlewares/ensureEnterprise";

const routesRoutes = Router();
const createRouteController = new CreateRouteController();
const getRouteByDriverIdController = new GetRouteByDriverIdController();
const getRouteByIdController = new GetRouteByIdController();
const getRouteByEnterpriseIdController = new GetRouteByEnterpriseIdController();
const deleteRouteController = new DeleteRouteController();
routesRoutes.post("/",ensureAuthenticated,ensureEnterprise,createRouteController.handle);
routesRoutes.get("/:route_id",ensureAuthenticated,getRouteByIdController.handle)
routesRoutes.get("/byDriver/:driver_id",ensureAuthenticated,getRouteByDriverIdController.handle);
routesRoutes.get("/byEnterprise/:enterprise_id",ensureAuthenticated,getRouteByEnterpriseIdController.handle);
routesRoutes.delete("/:route_id",ensureAuthenticated,ensureEnterprise,deleteRouteController.handle);

export{routesRoutes}