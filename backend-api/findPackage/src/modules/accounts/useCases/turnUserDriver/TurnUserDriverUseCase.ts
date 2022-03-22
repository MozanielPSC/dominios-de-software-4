import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class TurnUserDriverUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) { }

    async execute(user_id: string) {
        const userVerify = await this.usersRepository.findById(user_id);
        if(!userVerify){
            throw new AppError("User does not exists");
        }
        if(userVerify.isDriver){
            throw new AppError("User is already a driver");
        }

        userVerify.isDriver = true;
        await this.usersRepository.create(userVerify);
        const userReturn = userVerify;
        userReturn.password = null;
        return userReturn;
        
    }
}
export { TurnUserDriverUseCase }