import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse {
  user: {
    username: string,
    avatar: string,
    isAdmin: boolean,
    isDriver: boolean,
    isEnterprise: boolean,
    id: string,
  };
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider,
    @inject("UsersRepository") private usersRepository: IUsersRepository

  ) {

  }
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;
    const user_id = sub;
    const user_token = await this.userTokensRepository.findByUserId(user_id, token);
    const userFinal = await this.usersRepository.findById(user_id);
    if (userFinal.avatar) {
      if (process.env.disk === "local") {
        userFinal.avatar = `${process.env.APP_API_URL}/avatar/${userFinal.avatar}`;
      } else if (process.env.disk === "s3") {
        userFinal.avatar = `${process.env.AWS_BUCKET_URL}/avatar/${userFinal.avatar}`;
      }
    } else {
      userFinal.avatar = userFinal.avatar;
    }
    if (!user_token) {
      throw new AppError("Token does not exists");
    }

    await this.userTokensRepository.deleteById(user_token.id);
    const refresh_token = sign({ email }, auth.secret_refresh_token, { subject: sub, expiresIn: auth.expires_in_refresh_token });
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days)
    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })
    return {
      token: newToken,
      refresh_token,
      user: {
        username: userFinal.username,
        avatar: userFinal.avatar,
        isAdmin: userFinal.isAdmin,
        isDriver: userFinal.isDriver,
        isEnterprise: userFinal.isEnterprise,
        id: userFinal.id,
      }
    };



  }
}
export { RefreshTokenUseCase }