import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class GetRouteByIdUseCase{
    constructor(
        @inject("RoutesRepository") private repository:IRoutesRepository
    ){

    }

    async execute(route_id:string){
        const routeVerify = await this.repository.findById(route_id);
        if(!routeVerify){
            throw new AppError("Route does not exist");
        }

        return routeVerify;
    }
}
export {GetRouteByIdUseCase}