import { IRoutesRepository } from "../../repositories/IRoutesRepository";
import { ICreateRouteDTO } from "../../dtos/ICreateRouteDTO";
import { getRepository, Repository } from "typeorm";
import { Routes } from "../typeorm/entities/Routes";

class RoutesRepository implements IRoutesRepository {
    private repository: Repository<Routes>;
    constructor() {
        this.repository = getRepository(Routes);
    }


    async create({
        driver_id,
        enterprise_id,
        id,
        initialDate,
    }: ICreateRouteDTO): Promise<Routes> {
        const route = this.repository.create({
            driver_id,
            enterprise_id,
            id,
            initialDate,
        });
        await this.repository.save(route);
        return route;
    }

    async findByDriverId(driver_id: string): Promise<Routes[]> {
        const routeVerify = await this.repository.find({ driver_id });
        return routeVerify;
    }
    async findByEnterpriseId(enterprise_id: string): Promise<Routes[]> {
        const routeVerify = await this.repository.find({ enterprise_id });
        return routeVerify;
    }
    async findById(id: string): Promise<Routes> {
        const routeVerify = await this.repository.findOne(id);
        return routeVerify;
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findAll(): Promise<Routes[]> {
        const routeVerify = await this.repository.find();
        return routeVerify;
    }

    async save(route: Routes): Promise<Routes> {
        const routeVerify = await this.repository.save(route);
        return routeVerify;
    }
}

export { RoutesRepository };