import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreatePathDTO } from "../../dtos/ICreatePathDTO";
import { IPathsRepository } from "../../repositories/IPathsRepository";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";
@injectable()
class CreatePathUseCase {
    constructor(
        @inject("PathsRepository") private pathsRepository: IPathsRepository,
        @inject("RoutesRepository") private routesRepository: IRoutesRepository,
    ) { }
    async execute({
        route_id,
        initLat,
        finalLat,
        initLong,
        finalLong,
        isInitial,
        isFinal
    }: ICreatePathDTO) {
        const verifyRoute = await this.routesRepository.findById(route_id);
        if (!verifyRoute) {
            throw new AppError("Route does not exist")
        }

        if (isInitial && isFinal) {
            throw new AppError("Route cannot be initial and final at the same time");
        }
       const path = await this.pathsRepository.create({
            route_id,
            initLat,
            finalLat,
            initLong,
            finalLong,
            isInitial,
            isFinal
        })
        return path;
    }
}

export { CreatePathUseCase }

