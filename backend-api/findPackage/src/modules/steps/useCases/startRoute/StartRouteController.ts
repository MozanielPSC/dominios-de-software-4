import { Request, Response } from "express";
import { container } from "tsyringe";
import { StartRouteUseCase } from "./StartRouteUseCase";

class StartRouteController {
    handle(request: Request, response: Response) {
        const { route_id } = request.body;
        const updatePathUseCase = container.resolve(StartRouteUseCase);
        const path = updatePathUseCase.execute({ route_id })
        return response.status(200).json(path);
    }
}
export { StartRouteController }