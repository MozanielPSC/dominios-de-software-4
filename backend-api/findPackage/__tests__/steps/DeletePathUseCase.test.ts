import "reflect-metadata"

import { ICreatePathDTO } from "../../src/modules/steps/dtos/ICreatePathDTO";
import { Paths } from "../../src/modules/steps/infra/typeorm/entities/Paths";
import { IPathsRepository } from "../../src/modules/steps/repositories/IPathsRepository";
import { DeletePathUseCase } from "../../src/modules/steps/useCases/deletePath/DeletePathUseCase";

class FakePathRepository implements IPathsRepository {
    async create(data:ICreatePathDTO):Promise<Paths> {
        throw new Error('Not implemented')
    }
    async findByRouteId(route_id:string):Promise<Paths[]>{
        throw new Error('Not implemented')
    }
    async findById(id: string):Promise<Paths> {
        throw new Error('Not implemented')
    }
    async deleteById(id: string): Promise<void> {
        throw new Error('Not implemented')
    }
}

describe('DeletePath', () => {
    test('Should return AppError on path not found', async () => {
        const pathRepository = new FakePathRepository()
        jest.spyOn(pathRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve(undefined))
        const usecase = new DeletePathUseCase(pathRepository)
        expect(usecase.execute('any')).rejects.toEqual({ message: "Path does not exist", statusCode: 400 });
    })
})