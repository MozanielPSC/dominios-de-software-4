import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { Routes } from "../../infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class GetRouteByEnterpriseIdUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository : IUsersRepository,
        @inject("RoutesRepository") private routesRepository: IRoutesRepository
    ) { }

    async execute(enterprise_id: string){
        const enterpriseVerify = await this.usersRepository.findById(enterprise_id);
        if(!enterpriseVerify){
            throw new AppError("Enterprise does not exist");
        }
        if(!enterpriseVerify.isEnterprise){
            throw new AppError("Enterprise is not an enterprise");
        }

        const routes:Routes[] = await this.routesRepository.findByEnterpriseId(enterprise_id); 
        if(!routes){
            throw new AppError("Couldn't find routes");
        }
        return routes;
    }
}

export { GetRouteByEnterpriseIdUseCase }