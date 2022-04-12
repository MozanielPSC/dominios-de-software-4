import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPathsRepository } from "../../repositories/IPathsRepository";

@injectable()
class DeletePathUseCase {
    constructor(
        @inject("PathsRepository") private pathsRepository: IPathsRepository
    ) { }

    async execute(path_id: string) {
        const pathVerify = await this.pathsRepository.findById(path_id);
        if (!pathVerify) {
            throw new AppError("Path does not exist");
        }
        await this.pathsRepository.deleteById(path_id);
    }
}
export { DeletePathUseCase }