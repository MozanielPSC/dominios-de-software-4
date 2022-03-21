import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

injectable()
class GetRouteByEnterpriseIdUseCase {
    constructor(
        @inject("RoutesRepository") private repository: IRoutesRepository,
        @inject("UsersRepository") private usersRepository : IUsersRepository
    ) { }

    async execute(enterprise_id: string) {

        const routesVerify = await this.repository.findByEnterpriseId(enterprise_id);
        if (!routesVerify) {
            throw new AppError("Cannot find routes");
        }
        return routesVerify;
    }
}

export { GetRouteByEnterpriseIdUseCase }