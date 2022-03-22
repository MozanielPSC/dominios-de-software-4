import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRouteUseCase } from "./DeleteRouteUseCase";

class DeleteRouteController {
    async handle(request: Request, response: Response) {
        const { route_id } = request.params;
        const deleteRouteUseCase = container.resolve(DeleteRouteUseCase);
        await deleteRouteUseCase.execute(route_id);
        return response.status(200).send();
    }
}
export { DeleteRouteController }