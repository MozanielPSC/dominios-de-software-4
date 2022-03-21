import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPathsByRouteIdUseCase } from "./GetPathsByRouteIdUseCase";

class GetPathsByRouteIdController{
    async handle(request:Request,response:Response){
        const {route_id} = request.params;
        const getPathsByRouteIdUseCase = container.resolve(GetPathsByRouteIdUseCase);
        const paths = await getPathsByRouteIdUseCase.execute(route_id);
        return response.status(200).json(paths);
    }
}

export {GetPathsByRouteIdController}