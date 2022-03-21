import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRouteByEnterpriseIdUseCase } from "./GetRouteByEnterpriseIdUseCase";

class GetRouteByEnterpriseIdController {
    async handle(request: Request, response: Response) {
        const {enterprise_id} = request.params;
        const getRouteByEnterpriseIdUseCase = container.resolve(GetRouteByEnterpriseIdUseCase);
        const routes = await getRouteByEnterpriseIdUseCase.execute(enterprise_id);
        return response.status(200).json(routes);
    }
}

export { GetRouteByEnterpriseIdController }