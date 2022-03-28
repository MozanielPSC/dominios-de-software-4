import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRouteUseCase } from "./UpdateRouteUseCase";

class UpdateRouteController {
    async handle(request: Request, response: Response) {
        const { route_id } = request.params;
        const { driver_id, initialDate, expectedEnd, isFinished } = request.body;
        const updateRouteUseCase = container.resolve(UpdateRouteUseCase);
        const route = await updateRouteUseCase.execute(route_id, driver_id, initialDate, expectedEnd, isFinished);
        return response.status(200).json(route);
    }
}
export { UpdateRouteController }