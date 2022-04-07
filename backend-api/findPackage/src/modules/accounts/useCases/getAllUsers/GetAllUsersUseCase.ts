import { String } from "aws-sdk/clients/apigateway";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface User {
  username: string;
  email: string;
  id:string;
  avatar:string;
  isAdmin: boolean;
  isDriver:boolean;
  isEnterprise: boolean;
}

interface IResponse {
  users: User[]
}

@injectable()
class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository") private repository: IUsersRepository,
    ) {

  }
  async execute() {
    const users = await this.repository.findAll();
    if(!users){
      throw new AppError("Couldn't find users");
  }
  return users ;
  }

}
export { GetAllUsersUseCase }