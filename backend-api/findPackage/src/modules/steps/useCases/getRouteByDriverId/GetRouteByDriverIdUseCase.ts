import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { Routes } from "../../infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class GetRouteByDriverIdUseCase{
    constructor(
        @inject("UsersRepository") private usersRepository : IUsersRepository,
        @inject("RoutesRepository")private routesRepository:IRoutesRepository
    ){}

    async execute(driver_id: string){
        const driverVerify = await this.usersRepository.findById(driver_id);
        if(!driverVerify){
            throw new AppError("Driver does not exist");
        }
        if(!driverVerify.isDriver){
            throw new AppError("Driver is not a driver");
        }

        const routes:Routes[] = await this.routesRepository.findByDriverId(driver_id); 
        if(!routes){
            throw new AppError("Couldn't find routes");
        }
        return routes;
    }
}

export{GetRouteByDriverIdUseCase}