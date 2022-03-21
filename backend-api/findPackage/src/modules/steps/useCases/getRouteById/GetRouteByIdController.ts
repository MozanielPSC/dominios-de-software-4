import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRouteByIdUseCase } from "./GetRouteByIdUseCase";

class GetRouteByIdController {
    async handle(request: Request, response: Response) {
        const {route_id} = request.params;
        const getRouteByIdUseCase = container.resolve(GetRouteByIdUseCase);
        const route = await getRouteByIdUseCase.execute(route_id);
        return response.status(200).json(route);
    }
}

export { GetRouteByIdController }