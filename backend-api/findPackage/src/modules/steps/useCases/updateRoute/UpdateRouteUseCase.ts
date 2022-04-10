import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRoutesRepository } from "../../repositories/IRoutesRepository";

@injectable()
class UpdateRouteUseCase {
    constructor(@inject("RoutesRepository") private routesRepository: IRoutesRepository) { }
    async execute(
        route_id: string,
        driver_id: string,
        initialDate: Date,
        expectedEnd: Date,
        isFinished: boolean) {
        const route = await this.routesRepository.findById(route_id);
        if (!route) {
            throw new AppError("Route does not exists");
        }
        route.driver_id = driver_id;
        route.initialDate = initialDate;
        route.expectedEnd = expectedEnd;
        route.isFinished = isFinished;
      const response =  await this.routesRepository.save(route);
      return response;

    }
}
export { UpdateRouteUseCase }