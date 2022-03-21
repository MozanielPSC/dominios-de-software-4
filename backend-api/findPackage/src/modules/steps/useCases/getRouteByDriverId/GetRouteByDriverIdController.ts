import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRouteByDriverIdUseCase } from "./GetRouteByDriverIdUseCase";

class GetRouteByDriverIdController {
    async handle(request: Request, response: Response) {
        const { driver_id } = request.params;
        const getRouteByDriverIdUseCase = container.resolve(GetRouteByDriverIdUseCase);
        const routes = await getRouteByDriverIdUseCase.execute(driver_id);
        return response.status(200).json(routes);
    }
}

export { GetRouteByDriverIdController }