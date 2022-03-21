import { ICreatePathDTO } from "../dtos/ICreatePathDTO"
import { Paths } from "../infra/typeorm/entities/Paths"

interface IPathsRepository{
    create(data:ICreatePathDTO):Promise<Paths>;
    findByRouteId(route_id:string):Promise<Paths[]>;
    findById(id: string):Promise<Paths>;
}

export{IPathsRepository}