import "reflect-metadata"
import { ICreateRouteDTO } from "../../src/modules/steps/dtos/ICreateRouteDTO";
import { Routes } from "../../src/modules/steps/infra/typeorm/entities/Routes";
import { IRoutesRepository } from "../../src/modules/steps/repositories/IRoutesRepository";
import { StartRouteUseCase} from "../../src/modules/steps/useCases/startRoute/StartRouteUseCase";

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

describe('Start Route',()=>{
    test('Should return AppError on route not found', async () => {
        const routeRepository = new FakeRouteRepository()
        const usecase = new StartRouteUseCase(routeRepository);
        const route_id="salve";
        expect(usecase.execute({route_id})).rejects.toEqual({ message: "Path does not exist", statusCode: 400 });
    })

    test('Should return an updated route if everything is correct', async () => {
        const routeRepository = new FakeRouteRepository();
        const verify = await routeRepository.create(
            {
                driver_id: "salve",
                enterprise_id: "salve",
                initialDate: new Date(),
            }
        )
        const usecase = new StartRouteUseCase(routeRepository);
        const route_id = verify.id;
        const updated = await usecase.execute({route_id});
        expect(updated.started).toEqual(true);
    })
})