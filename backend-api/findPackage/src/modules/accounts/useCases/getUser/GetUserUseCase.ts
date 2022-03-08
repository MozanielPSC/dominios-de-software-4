import { String } from "aws-sdk/clients/apigateway";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: {
    username: string,
    avatar: string,
    id: string,
  },
}

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository") private repository: IUsersRepository,
    ) {

  }
  async execute(id: String) {
    const user = await this.repository.findById(id);
    if (user.avatar) {
      if (process.env.disk === "local") {
        user.avatar = `${process.env.APP_API_URL}/avatar/${user.avatar}`;
      } else if (process.env.disk === "s3") {
        user.avatar = `${process.env.AWS_BUCKET_URL}/avatar/${user.avatar}`;
      }
    } else {
      user.avatar = user.avatar;
    }
    var response: IResponse = {
      user: {
        id: user.id,
        avatar: user.avatar,
        username: user.username,
      }
    }
    return response;
  }

}
export { GetUserUseCase }