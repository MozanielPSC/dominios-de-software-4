import "reflect-metadata"
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { GetRouteByDriverIdUseCase} from "../../src/modules/steps/useCases/getRouteByDriverId/GetRouteByDriverIdUseCase";
import { ICreateUsersDTO } from "../../src/modules/accounts/dtos/ICreateUsersDTO";
import { User } from "../../src/modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";
import {CreateUserUseCase} from "../../src/modules/accounts/useCases/createUser/CreateUserUseCase";
class FakeRouteRepository implements IRoutesRepository {
    routes : Routes[] = [];
    async create(data: ICreateRouteDTO): Promise<Routes> {
        const route = {...data,created_at:new Date(),id:"salve",expectedEnd: new Date(),isFinished:false,started:false};
        this.routes.push(route);
        return route;
    }
    async findByDriverId(driver_id: string): Promise<Routes[]> {
        return this.routes.map((route)=>{
            if(route.driver_id === driver_id){
                return route;
            }
        });
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
       return this.routes;
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
class FakeUserRepository implements IUsersRepository {
    users: User[] = [];
    async create(data:ICreateUsersDTO):Promise<User> {
      data.isDriver =  data.isDriver ? data.isDriver : false;
        const user = {...data,created_at:new Date(),id:"salve",isAdmin:false,isDriver:data.isDriver,isEnterprise:false,avatar:null};
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

describe("Should return routes by driver id",()=>{

    test('Should return an error if driver does not exist', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByDriverIdUseCase(usersRepository,routeRepository);
        expect((usecase.execute("1") as any)).rejects.toEqual({ message:"Driver does not exist", statusCode: 400 });
    })
    test('Should return an error', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByDriverIdUseCase(usersRepository,routeRepository);
        usersRepository.create({username:"salve",email:"salve",password:"salve"})
        expect(usecase.execute("salve")).rejects.toEqual({ message:"Driver is not a driver", statusCode: 400 });
    })
    test('Should be  able to return an Routes array', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByDriverIdUseCase(usersRepository,routeRepository);
        usersRepository.create({username:"salve",email:"salve",password:"salve",isDriver:true})
        expect(await usecase.execute("salve")).toEqual([]);
    })
})