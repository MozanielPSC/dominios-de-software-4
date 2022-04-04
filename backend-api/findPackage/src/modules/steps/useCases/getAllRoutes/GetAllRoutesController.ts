import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllRoutesUseCase } from "./GetAllRoutesUseCase";

class GetAllRoutesController {
    async handle(request: Request, response: Response) {
        const getRoutesUseCase = container.resolve(GetAllRoutesUseCase);
        const routes = await getRoutesUseCase.execute();
        return response.status(200).json(routes);
    }
}

export { GetAllRoutesController }