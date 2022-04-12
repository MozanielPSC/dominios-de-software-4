import "reflect-metadata"

import { ICreateUsersDTO } from "../../src/modules/accounts/dtos/ICreateUsersDTO";
import { User } from "../../src/modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { CreateRouteUseCase } from "../../src/modules/steps/useCases/createRoute/CreateRouteUseCase";

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

class FakeUserRepository implements IUsersRepository {
    async create(data:ICreateUsersDTO):Promise<void> {
        throw new Error('Not implemented')
    }
    async findByEmail(email:string):Promise<User> {
        throw new Error('Not implemented')
    }
    async findById(id:string):Promise<User> {
        throw new Error('Not implemented')
    }
    async search(query:string):Promise<User[]> {
        throw new Error('Not implemented')
    }
    async findAll():Promise<User[]> {
        throw new Error('Not implemented')
    }
}

describe('CreateRoute', () => {
    test('Should return AppError on route not found', async () => {
      const usersRepository = new FakeUserRepository()
      const routeRepository = new FakeRouteRepository()
      jest.spyOn(usersRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve(undefined))
      const usecase = new CreateRouteUseCase(usersRepository, routeRepository)
    
      expect(usecase.execute({ driver_id: 'any'} as any)).rejects
      .toEqual({ message: "Driver does not exist", statusCode: 400 });

    })

    test('Should return AppError on user is not a driver', async () => {
        const usersRepository = new FakeUserRepository()
        const routeRepository = new FakeRouteRepository()
        jest.spyOn(usersRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve({ 
            isDriver: false,
        } as User))
        const usecase = new CreateRouteUseCase(usersRepository, routeRepository)
      
        expect(usecase.execute({ driver_id: 'any'} as any)).rejects
        .toEqual({ message: "Driver is not a driver", statusCode: 400 });
  
    })

    test('Should return route on success', async () => {
        const usersRepository = new FakeUserRepository()
        const routeRepository = new FakeRouteRepository()
        jest.spyOn(usersRepository, 'findById').mockImplementationOnce((id: string) => Promise.resolve({ 
            isDriver: true,
        } as User))
        jest.spyOn(routeRepository, 'create').mockImplementationOnce((params) => Promise.resolve({ 
            ...params
        } as any))
        const usecase = new CreateRouteUseCase(usersRepository, routeRepository)
        
        const result = await usecase.execute(({ driver_id: 'any', started: false } as any))

        expect(result.started).toBeFalsy()
        expect(result.driver_id).toBe('any')
    })
  
})