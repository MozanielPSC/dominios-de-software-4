import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";


interface IRequest {
    route_id: string
}
@injectable()
class StartRouteUseCase {
    constructor(
        @inject("RoutesRepository") private routesRepository: IRoutesRepository
    ) { }

    async execute({ route_id }: IRequest) {
        const routeVerify = await this.routesRepository.findById(route_id);
        if (!routeVerify) {
            throw new AppError("Path does not exist");
        }

        routeVerify.started = true
        await this.routesRepository.save(routeVerify);
        return routeVerify;
    }
}
export { StartRouteUseCase }