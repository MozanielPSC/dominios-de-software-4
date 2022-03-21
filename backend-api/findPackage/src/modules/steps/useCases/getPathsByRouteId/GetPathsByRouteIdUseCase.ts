import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPathsRepository } from "../../repositories/IPathsRepository";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

injectable()
class GetPathsByRouteIdUseCase{
    constructor(
        @inject("RoutesRepository") private routesRepository: IRoutesRepository,
        @inject("PathsRepository") private pathsRepository:IPathsRepository
    ){}

    async execute(route_id:string){
       const routeVerify = await this.routesRepository.findById(route_id);
       if(!routeVerify){
           throw new AppError("Route does not exist");
       }

       const paths = await this.pathsRepository.findByRouteId(route_id);
       return paths;
    }
}

export{GetPathsByRouteIdUseCase}