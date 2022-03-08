import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { getRepository, Repository } from "typeorm";
import { User } from "../typeorm/entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async search(query: string): Promise<User[]> {
    return await this.repository
      .createQueryBuilder("user").where("user.username ilike :username", { username: `%${query}%` }).getMany();
  }


  async create({ username, password, email, avatar, id, isAdmin }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      username,
      password,
      email,
      avatar,
      id,
      isAdmin,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const userVerify = await this.repository.findOne({ email });
    return userVerify;
  }

  async findById(id: string): Promise<User> {
    const userVerify = await this.repository.findOne(id);
    return userVerify;
  }

}

export { UsersRepository };