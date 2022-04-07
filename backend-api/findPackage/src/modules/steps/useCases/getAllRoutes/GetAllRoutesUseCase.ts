import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Routes } from "../../infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class GetAllRoutesUseCase{
    constructor(
        @inject("RoutesRepository") private repository:IRoutesRepository
    ){

    }

    async execute(){
        const routes:Routes[] = await this.repository.findAll(); 
        if(!routes){
            throw new AppError("Couldn't find routes");
        }
        return routes ;
    }
}
export {GetAllRoutesUseCase}