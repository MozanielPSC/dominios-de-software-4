import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserInfoUseCase } from "./GetUserInfoUseCase";

class GetUserInfoController{
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const getUserInfoUseCase = container.resolve(GetUserInfoUseCase);
        const user = await getUserInfoUseCase.execute(user_id);
        return response.status(200).json(user);

    }

}

export {GetUserInfoController}