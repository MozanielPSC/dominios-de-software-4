import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPathsRepository } from "../../repositories/IPathsRepository";


interface IRequest {
    initLat: number,
    finalLat: number,
    initLong: number,
    finalLong: number,
    id: string,
    isInitial: boolean,
    isFinal: boolean
}
@injectable()
class UpdatePathUseCase {
    constructor(
        @inject("PathsRepository") private pathsRepository: IPathsRepository
    ) { }

    async execute({ initLat,
        finalLat,
        initLong,
        finalLong,
        id,
        isInitial,
        isFinal }: IRequest) {
        const pathVerify = await this.pathsRepository.findById(id);
        if (!pathVerify) {
            throw new AppError("Path does not exist");
        }

        pathVerify.finalLat = finalLat;
        pathVerify.initLat = initLat;
        pathVerify.finalLong = finalLong;
        pathVerify.initLong = initLong;
        pathVerify.isFinal = isFinal;
        pathVerify.isInitial = isInitial;
        await this.pathsRepository.create(pathVerify);
        return pathVerify;
    }
}
export { UpdatePathUseCase }