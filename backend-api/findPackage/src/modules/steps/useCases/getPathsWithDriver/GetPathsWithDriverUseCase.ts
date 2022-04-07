import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Paths } from "../../infra/typeorm/entities/Paths";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IPathsRepository } from "../../repositories/IPathsRepository";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

interface IResponse {
    id: string;
    city_initial: string;
    city_final: string;
    state_initial: string;
    state_final: string;
    driver: string;
}

@injectable()
class GetPathsWithDriverUseCase {
    constructor(
        @inject("RoutesRepository") private routesRepository: IRoutesRepository,
        @inject("PathsRepository") private pathsRepository: IPathsRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository,
    ) { }

    async execute(route_id: string) {
        const routeVerify = await this.routesRepository.findById(route_id);
        if (!routeVerify) {
            throw new AppError("Route does not exist");
        }
        const driverId = routeVerify.driver_id;
        const driver = (await this.usersRepository.findById(driverId)).username;

        const paths = await this.pathsRepository.findByRouteId(route_id);
        if (paths.length === 0) {
            throw new AppError("Paths not found");
        }

        const response: IResponse = {} as IResponse;
        
        const generatesResponse = (paths: Paths[]) => {
            paths.forEach(path => {
                if (path.isInitial) {
                    response.city_initial = path.city_name;
                    response.state_initial = path.state;
                }
                if (path.isFinal) {
                    response.city_final = path.city_name;
                    response.state_final = path.state;
                }
            });
            response.id = route_id;
            response.driver = driver;
        }

        generatesResponse(paths);

        return response;

    }


}

export { GetPathsWithDriverUseCase }