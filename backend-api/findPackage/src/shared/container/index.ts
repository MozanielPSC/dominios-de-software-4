import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../modules/accounts/repositories/IUserTokensRepository";
import { UserTokensRepository } from "../../modules/accounts/infra/repositories/UserTokensRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import "./providers/";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
)