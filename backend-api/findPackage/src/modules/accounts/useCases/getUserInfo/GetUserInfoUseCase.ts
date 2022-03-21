import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
interface IResponse {
    user: {
        name: string,
        email: string,
        avatar: string,
        isAdmin: boolean,
        isEnterprise:boolean,
        isDriver:boolean,
        id: string,
    }
}
@injectable()
class GetUserInfoUseCase {
    constructor(
        @inject("UsersRepository") private repository: IUsersRepository
    ) { }
    async execute(user_id: string) {
        const user = await this.repository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists");
        }

        
        if (user.avatar) {
            if (process.env.disk === "local") {
                user.avatar = `${process.env.APP_API_URL}/avatar/${user.avatar}`;
            } else if (process.env.disk === "s3") {
                user.avatar = `${process.env.AWS_BUCKET_URL}/avatar/${user.avatar}`;
            }
        } else {
            user.avatar = user.avatar;
        }

        const response:IResponse = {
            user: {
                name: user.username,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isEnterprise:user.isEnterprise,
                isDriver:user.isDriver,
                id: user.id,
              }
        }

        return response;

    }
}

export { GetUserInfoUseCase }