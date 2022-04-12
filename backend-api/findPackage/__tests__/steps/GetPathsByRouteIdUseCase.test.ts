import "reflect-metadata"

import { ICreatePathDTO } from "../../src/modules/steps/dtos/ICreatePathDTO";
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Paths } from "../../src/modules/steps/infra/typeorm/entities/Paths";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IPathsRepository } from "../../src/modules/steps/repositories/IPathsRepository";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { GetPathsByRouteIdUseCase } from "../../src/modules/steps/useCases/getPathsByRouteId/GetPathsByRouteIdUseCase";

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


describe("Should return routes by driver id",()=>{

    test('Should return an error if route does not exist', async () => {
        const routeRepository = new FakeRouteRepository();
        const pathsRepository = new FakePathRepository();
        const usecase = new GetPathsByRouteIdUseCase(routeRepository,pathsRepository);
        expect((usecase.execute("1") as any)).rejects.toEqual({ message:"Route does not exist", statusCode: 400 });
    })
    test('Should be  able to return an Paths array', async () => {
        const routeRepository = new FakeRouteRepository();
        const pathsRepository = new FakePathRepository();
        const usecase = new GetPathsByRouteIdUseCase(routeRepository,pathsRepository);
        const verify = await routeRepository.create(
            {
                driver_id: "salve",
                enterprise_id: "salve",
                initialDate: new Date(),
            }
        )
        expect(await usecase.execute(verify.id)).toEqual([]);
    })
})