import "reflect-metadata"


import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { DeleteRouteUseCase } from "../../src/modules/steps/useCases/deleteRoute/DeleteRouteUseCase";

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


describe('DeleteRoute', () => {
    test('Should return AppError on path not found', async () => {
        const routeRepository = new FakeRouteRepository()
        jest.spyOn(routeRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve(undefined))
        const usecase = new DeleteRouteUseCase(routeRepository)
        expect(usecase.execute('any')).rejects.toEqual({ message: "Route does not exist", statusCode: 400 });
    })
})