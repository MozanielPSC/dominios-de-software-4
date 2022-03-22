import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePathUseCase } from "./UpdatePathUseCase";

class UpdatePathController {
    handle(request: Request, response: Response) {
        const { initLat, finalLat, initLong, finalLong, id, isInitial, isFinal } = request.body;
        const updatePathUseCase = container.resolve(UpdatePathUseCase);
        const path = updatePathUseCase.execute({ initLat, finalLat, initLong, finalLong, id, isInitial, isFinal })
        return response.status(200).json(path);
    }
}
export { UpdatePathController }