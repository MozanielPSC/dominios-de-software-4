import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController{
  async handle(request:Request,response:Response){
    const {id} = request.params;
    const getUser = container.resolve(GetUserUseCase);
    const final = await getUser.execute(id);
    return response.status(200).json(final)
  }
}
export {GetUserController}