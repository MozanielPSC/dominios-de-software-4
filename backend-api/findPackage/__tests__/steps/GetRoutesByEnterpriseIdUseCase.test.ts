import "reflect-metadata"
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { ICreateUsersDTO } from "../../src/modules/accounts/dtos/ICreateUsersDTO";
import { User } from "../../src/modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";
import { GetRouteByEnterpriseIdUseCase } from "../../src/modules/steps/useCases/getRoutesByEnterpriseId/GetRouteByEnterpriseIdUseCase";
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
       return this.routes.map(
            (ro)=>{
                if(ro.enterprise_id === enterprise_id){
                    return ro;
                }
           }
       );
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
class FakeRouteRepository2 implements IRoutesRepository {
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
       return null;
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
      data.isEnterprise =  data.isEnterprise ? data.isEnterprise : false;
        const user = {...data,created_at:new Date(),id:"salve",isAdmin:false,isDriver:data.isDriver,isEnterprise:data.isEnterprise,avatar:null};
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


describe("Should return routes by enterprise id",()=>{

    test('Should return an error if enterprise does not exist', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByEnterpriseIdUseCase(usersRepository,routeRepository);
        expect((usecase.execute("1") as any)).rejects.toEqual({ message:"Enterprise does not exist", statusCode: 400 });
    })
    test('Should return an error if enterprise is not an enterprise', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByEnterpriseIdUseCase(usersRepository,routeRepository);
        usersRepository.create({username:"salve",email:"salve",password:"salve"})
        expect(usecase.execute("salve")).rejects.toEqual({ message:"Enterprise is not an enterprise", statusCode: 400 });
    })
    test('Should return an error if route does not exists', async () => {
        const routeRepository = new FakeRouteRepository2();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByEnterpriseIdUseCase(usersRepository,routeRepository);
        usersRepository.create({username:"salve",email:"salve",password:"salve",isEnterprise:true})
        expect(usecase.execute("salve")).rejects.toEqual({ message:"Couldn't find routes", statusCode: 400 });
    })
    test('Should be  able to return an Routes array', async () => {
        const routeRepository = new FakeRouteRepository();
        const usersRepository = new FakeUserRepository();
        const usecase = new GetRouteByEnterpriseIdUseCase(usersRepository,routeRepository);
        usersRepository.create({username:"salve",email:"salve",password:"salve",isEnterprise:true})
        expect(await usecase.execute("salve")).toEqual([]);
    })
})