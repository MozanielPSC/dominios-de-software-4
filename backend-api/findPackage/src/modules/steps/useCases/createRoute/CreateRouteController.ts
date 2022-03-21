import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRouteUseCase } from "./CreateRouteUseCase";

class CreateRouteController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const { driver_id } = request.body;
        const createRouteUseCase = container.resolve(CreateRouteUseCase);
        const route = await createRouteUseCase.execute({ driver_id, enterprise_id: id });
        return response.status(200).json(route);
    }
}

export { CreateRouteController }