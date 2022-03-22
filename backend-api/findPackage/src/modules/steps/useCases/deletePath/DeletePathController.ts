import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePathUseCase } from "./DeletePathUseCase";

class DeletePathController {
    async handle(request: Request, response: Response) {
        const { path_id } = request.params;
        const deletePathUseCase = container.resolve(DeletePathUseCase);
        await deletePathUseCase.execute(path_id);
        return response.status(200).send();
    }
}
export { DeletePathController }