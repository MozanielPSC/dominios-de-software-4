import { User } from "../infra/typeorm/entities/User";

interface ICreateUsersDTO {
  username: string;
  email: string;
  password: string;
  id?:string;
  avatar?:string;
  following?:User[];
  isAdmin?:boolean;
}

export{ICreateUsersDTO};