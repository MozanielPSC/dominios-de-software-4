import { ICreateRouteDTO } from "../dtos/ICreateRouteDTO"
import { Routes } from "../infra/typeorm/entities/Routes"

interface IRoutesRepository {
    create(data: ICreateRouteDTO): Promise<Routes>;
    findByDriverId(driver_id: string): Promise<Routes[]>;
    findByEnterpriseId(enterprise_id: string): Promise<Routes[]>;
    findById(id: string): Promise<Routes>;
}
export { IRoutesRepository }