import "reflect-metadata"
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { UpdateRouteUseCase} from "../../src/modules/steps/useCases/updateRoute/UpdateRouteUseCase";

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