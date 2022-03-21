import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../modules/accounts/repositories/IUserTokensRepository";
import { UserTokensRepository } from "../../modules/accounts/infra/repositories/UserTokensRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import "./providers/";
import { IPathsRepository } from "../../modules/steps/repositories/IPathsRepository";
import { PathsRepository } from "../../modules/steps/infra/repositories/PathsRepository";
import { IRoutesRepository } from "../../modules/steps/repositories/IRoutesRepository";
import { RoutesRepository } from "../../modules/steps/infra/repositories/RoutesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
)

container.registerSingleton<IPathsRepository>(
  "PathsRepository",
  PathsRepository
)

container.registerSingleton<IRoutesRepository>(
  "RoutesRepository",
  RoutesRepository
)