import "reflect-metadata"

import { ICreatePathDTO } from "../../src/modules/steps/dtos/ICreatePathDTO";
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Paths } from "../../src/modules/steps/infra/typeorm/entities/Paths";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IPathsRepository } from "../../src/modules/steps/repositories/IPathsRepository";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { UpdatePathUseCase } from "../../src/modules/steps/useCases/updatePath/UpdatePathUseCase";

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
        this.paths =  this.paths.filter((pa)=>{
            if(pa.id != path.id){
                return pa;
            }
        })
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

describe('Update Path',()=>{
    test('Should return AppError on path not found', async () => {
        const pathRepository = new FakePathRepository()
        const usecase = new UpdatePathUseCase(pathRepository);
        expect(usecase.execute({
            initLat: 20,
            finalLat:30,
            initLong:40,
            finalLong:50,
            id:'blau',
            isInitial:false,
            isFinal:false,
            city_name:'Goiania',
            state:'MA',
            isComplete:false
        }
        )).rejects.toEqual({message:"Path does not exist",statusCode:400})
    })

    test('Should return an updated path if everything is correct', async () => {
        const pathRepository = new FakePathRepository();
        const verify = await pathRepository.create(
            {
                route_id: "id",
                initLat: 10,
                initLong: 10,
                city_name:'Taubate',
                state:'GO'
            }
        )
        const usecase = new UpdatePathUseCase(pathRepository);
        const updated = await usecase.execute({
            initLat: 20,
            finalLat:30,
            initLong:40,
            finalLong:50,
            id:verify.id,
            isInitial:false,
            isFinal:false,
            city_name:'Goiania',
            state:'MA',
            isComplete:false
        }
        );
        expect(updated.city_name).toEqual("Goiania");
    })
})