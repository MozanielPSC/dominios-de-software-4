import "reflect-metadata"

import { ICreatePathDTO } from "../../src/modules/steps/dtos/ICreatePathDTO";
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Paths } from "../../src/modules/steps/infra/typeorm/entities/Paths";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IPathsRepository } from "../../src/modules/steps/repositories/IPathsRepository";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { GetPathsWithDriverUseCase } from "../../src/modules/steps/useCases/getPathsWithDriver/GetPathsWithDriverUseCase";
import { ICreateUsersDTO } from "../../src/modules/accounts/dtos/ICreateUsersDTO";
import { User } from "../../src/modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";

class FakeRouteRepository implements IRoutesRepository {
    routes : Routes[] = [];
    async create(data: ICreateRouteDTO): Promise<Routes> {
        const route = {...data,created_at:new Date(),id:"salve",expectedEnd: new Date(),isFinished:false,started:false};
        this.routes.push(route);
        return route;
    }
    async findByDriverId(driver_id: string): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async findByEnterpriseId(enterprise_id: string): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async findById(id: string): Promise<Routes> {
       return this.routes.find(route => route.id === id)
    }
    async deleteById(id: string): Promise<void> {
        throw new Error('Not implemented')
    }
    async findAll(): Promise<Routes[]> {
        throw new Error('Not implemented')
    }
    async save(route: Routes): Promise<Routes> {
      this.routes =  this.routes.filter((ro)=>{
          if(ro.id != route.id){
              return ro;
          }
      })
        this.routes.push(route);
        return route;
    }
}

class FakePathRepository implements IPathsRepository {
    paths: Paths[] = [];
    async create(data:ICreatePathDTO):Promise<Paths> {
        const path = {...data,
            created_at:new Date(),
            id:"salve",
            expectedEnd: new Date(),
            route_id:"id",
            finalLat: 10,
            finalLong: 10,
            isInitial:false,
            isFinal:false,
            isComplete: false
        };
        this.paths.push(path);
        return path;
    }
    async findByRouteId(route_id:string):Promise<Paths[]>{
       return this.paths.map((path)=>{
           if(path.route_id === route_id){
               return path;
           }
       });
    }
    async findById(id: string):Promise<Paths> {
        return this.paths.find(path => path.id === id);
    }
    async deleteById(id: string): Promise<void> {
        this.paths = this.paths.filter((path)=>{
            if(path.id != id){
                return path;
            }
        })
    }
}

class FakeUserRepository implements IUsersRepository {
    users: User[] = [];
    async create(data:ICreateUsersDTO):Promise<User> {
      data.isDriver =  data.isDriver ? data.isDriver : true;
      data.isEnterprise =  data.isEnterprise ? data.isEnterprise : true;
        const user = {...data,created_at:new Date(),id:"salve",isAdmin:true,isDriver:data.isDriver,isEnterprise:data.isEnterprise,avatar:null};
        this.users.push(user);
        return user;
    }
    async findByEmail(email:string):Promise<User> {
       return this.users.find(user => user.email === email);
    }
    async findById(id:string):Promise<User> {
        return this.users.find(user => user.id === id);
    }
    async search(query:string):Promise<User[]> {
        throw new Error('Not implemented')
    }
    async findAll():Promise<User[]> {
        throw new Error('Not implemented')
    }
}

describe('Get Path With Driver',()=>{
    test('Should return AppError on route not found', async () => {
        const pathRepository = new FakePathRepository();
        const usersRepository = new FakeUserRepository();
        const routeRepository = new FakeRouteRepository();
        usersRepository.create({username:"salve",email:"salve",password:"salve"})
        const usecase = new GetPathsWithDriverUseCase(routeRepository,pathRepository,usersRepository);
        expect(usecase.execute("123")).rejects.toEqual({message:"Route does not exist",statusCode:400});

    })

    test('Should return an error if paths doesnt exist', async () => {
        const pathRepository = new FakePathRepository();
        const usersRepository = new FakeUserRepository();
        const routeRepository = new FakeRouteRepository();
        usersRepository.create({username:"salve",email:"salve",password:"salve"})
        const usecase = new GetPathsWithDriverUseCase(routeRepository,pathRepository,usersRepository);
        const verify = await routeRepository.create(
            {
                driver_id: "salve",
                enterprise_id: "salve",
                initialDate: new Date(),
            }
        )
        expect(usecase.execute("salve")).rejects.toEqual({message:"Paths not found",statusCode:400});

    })
    test('Should return an error if paths doesnt exist', async () => {
        const pathRepository = new FakePathRepository();
        const usersRepository = new FakeUserRepository();
        const routeRepository = new FakeRouteRepository();
        usersRepository.create({username:"salve",email:"salve",password:"salve"})
        const usecase = new GetPathsWithDriverUseCase(routeRepository,pathRepository,usersRepository);
        const verify = await routeRepository.create(
            {
                driver_id: "salve",
                enterprise_id: "salve",
                initialDate: new Date(),
            }
        )
        expect(usecase.execute("salve")).rejects.toEqual({message:"Paths not found",statusCode:400});

    })
})