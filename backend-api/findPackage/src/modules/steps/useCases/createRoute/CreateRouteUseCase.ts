import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateRouteDTO } from "../../dtos/ICreateRouteDTO";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class CreateRouteUseCase{
    constructor(
        @inject("UsersRepository") private usersRepository:IUsersRepository,
        @inject("RoutesRepository") private routesRepository:IRoutesRepository
    ){}

    async execute({driver_id,enterprise_id,initialDate,expectedEnd}:ICreateRouteDTO){
        const driverVerify = await this.usersRepository.findById(driver_id);
        if(!driverVerify){
            throw new AppError("Driver does not exist");
        }
        if(!driverVerify.isDriver){
            throw new AppError("Driver is not a driver");
        }
        const route = await this.routesRepository.create({
            driver_id,
            enterprise_id,
            started: false,
            initialDate: new Date(initialDate),
            expectedEnd
        })

        return route;
    }
}

export{CreateRouteUseCase}