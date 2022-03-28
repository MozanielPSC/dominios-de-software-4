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
    isFinal: boolean,
    city_name: string,
    state: string,
    isComplete: boolean
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
        isFinal,
        city_name,
        state,
        isComplete }: IRequest) {
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
        pathVerify.city_name = city_name;
        pathVerify.state = state;
        pathVerify.isComplete = isComplete;
        await this.pathsRepository.create(pathVerify);
        return pathVerify;
    }
}
export { UpdatePathUseCase }