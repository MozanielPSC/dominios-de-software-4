import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPathsWithDriverUseCase } from "./GetPathsWithDriverUseCase";

class GetPathsWithDriverController{
    async handle(request:Request,response:Response){
        const { route_id } = request.params;
        const getPathsWithDriverUseCase = container.resolve(GetPathsWithDriverUseCase);
        const paths = await getPathsWithDriverUseCase.execute(route_id);
        return response.status(200).json(paths);
    }
}

export {GetPathsWithDriverController}