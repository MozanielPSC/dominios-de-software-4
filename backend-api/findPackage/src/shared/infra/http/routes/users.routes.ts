import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { GetUserController } from "../../../../modules/accounts/useCases/getUser/GetUserController";
import { TurnUserDriverController } from "../../../../modules/accounts/useCases/turnUserDriver/TurnUserDriverController";
import { ensureEnterprise } from "../middlewares/ensureEnterprise";
import { GetAllUsersController } from "../../../../modules/accounts/useCases/getAllUsers/GetAllUsersController";


const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const getUser = new GetUserController();
const getAllUsersController = new GetAllUsersController();
const turnUserDriverController = new TurnUserDriverController();


usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/getUser/:id", getUser.handle);
usersRoutes.get("/getAll/", getAllUsersController.handle);
usersRoutes.patch("/turnDriver/:user_id", ensureAuthenticated, ensureEnterprise, turnUserDriverController.handle);
export { usersRoutes };