import "reflect-metadata"

import { ICreatePathDTO } from "../../src/modules/steps/dtos/ICreatePathDTO";
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Paths } from "../../src/modules/steps/infra/typeorm/entities/Paths";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IPathsRepository } from "../../src/modules/steps/repositories/IPathsRepository";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { CreatePathUseCase } from "../../src/modules/steps/useCases/createPath/CreatePathUseCase";

class FakeRouteRepository implements IRoutesRepository {
    async create(data: ICreateRouteDTO): Promise<Routes> {
        throw new Error('Not implemented')
    }
    async findByDriverId(driver_id: string): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async findByEnterpriseId(enterprise_id: string): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async findById(id: string): Promise<Routes> {
        throw new Error('Not implemented')
    }
    async deleteById(id: string): Promise<void> {
        throw new Error('Not implemented')
    }
    async findAll(): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async save(route: Routes): Promise<Routes> {
        throw new Error('Not implemented')
    }
}

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

describe('CreatePath', () => {
    test('Should return AppError on route not found', async () => {
        const routeRepository = new FakeRouteRepository()
        const pathRepository = new FakePathRepository()
        jest.spyOn(routeRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve(undefined))
        const usecase = new CreatePathUseCase(pathRepository, routeRepository)
      
        expect(usecase.execute({ route_id: 'any'} as any)).rejects
        .toEqual({ message: "Route does not exist", statusCode: 400 });

    })

    test('Should return AppError if route isFinal and isInitial', async () => {
        const routeRepository = new FakeRouteRepository()
        const pathRepository = new FakePathRepository()
        jest.spyOn(routeRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve({} as any))
        const usecase = new CreatePathUseCase(pathRepository, routeRepository)
      
        expect(usecase.execute({ isFinal: true, isInitial: true } as any)).rejects
        .toEqual({ message: "Route cannot be initial and final at the same time", statusCode: 400 });
    })

    test('Should return path on success', async () => {
        const routeRepository = new FakeRouteRepository()
        const pathRepository = new FakePathRepository()
        jest.spyOn(routeRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve({} as any))
        jest.spyOn(pathRepository, 'create').mockImplementationOnce((params) => Promise.resolve(params as any))

        const usecase = new CreatePathUseCase(pathRepository, routeRepository)

        const request = {
            isFinal: true, 
            isInitial: false
        } as any

        const result = await usecase.execute(request)
      
        expect(result).toEqual(request)
    })
  
})