import { Request, Response } from "express"
import { container } from "tsyringe";
import { TurnUserDriverUseCase } from "./TurnUserDriverUseCase";

class TurnUserDriverController {

   async handle(request: Request, response: Response) {
        const {user_id} = request.params;
        const turnUserDriverUseCase = container.resolve(TurnUserDriverUseCase);
        const driver = await turnUserDriverUseCase.execute(user_id);
        return response.status(200).json(driver);
    }
}
export { TurnUserDriverController }