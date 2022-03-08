import { inject, injectable } from "tsyringe"
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import * as EmailValidator from 'email-validator';

import { AppError } from "../../../../shared/errors/AppError";
@injectable()
class CreateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {

    }

    async execute({ username, password, email }: ICreateUsersDTO): Promise<void> {
        const passwordHash = await hash(password, 8);
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError("User already exists", 400);

        }
        if (!(EmailValidator.validate(email))) {
            throw new AppError("Invalid email", 400);

        }
        await this.usersRepository.create({ username, password: passwordHash, email });
    }
}

export { CreateUserUseCase };