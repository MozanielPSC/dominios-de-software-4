import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePathUseCase } from "./CreatePathUseCase";

class CreatePathController {
    async handle(request: Request, response: Response) {
        const { route_id, initLat, finalLat, initLong, finalLong, isInitial, isFinal,city_name,state } = request.body;
        const createPathUseCase = container.resolve(CreatePathUseCase);
        const path = await createPathUseCase.execute({ route_id, initLat, finalLat, initLong, finalLong,isInitial, isFinal,city_name,state });
        return response.status(200).json(path);
    }
}

export { CreatePathController }