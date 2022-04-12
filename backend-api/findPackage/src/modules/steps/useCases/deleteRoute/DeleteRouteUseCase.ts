import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class DeleteRouteUseCase {
    constructor(
        @inject("RoutesRepository") private routesRepository: IRoutesRepository
    ) { }
    async execute(route_id: string) {
        const repositoryVerify = await this.routesRepository.findById(route_id);
        if (!repositoryVerify) {
            throw new AppError("Route does not exist");
        }
        await this.routesRepository.deleteById(route_id);
    }
}

export { DeleteRouteUseCase }