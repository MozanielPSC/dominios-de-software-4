import {ICreateUsersDTO} from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";
interface IUsersRepository {
  create(data:ICreateUsersDTO):Promise<User>;
  findByEmail(email:string):Promise<User>;
  findById(id:string):Promise<User>;
  search(query:string):Promise<User[]>;
  findAll():Promise<User[]>;
}

export { IUsersRepository }