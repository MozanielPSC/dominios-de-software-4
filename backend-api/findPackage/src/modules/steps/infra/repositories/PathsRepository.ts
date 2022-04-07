import { IPathsRepository } from "../../repositories/IPathsRepository";
import { ICreatePathDTO } from "../../dtos/ICreatePathDTO";
import { getRepository, Repository } from "typeorm";
import { Paths } from "../typeorm/entities/Paths";

class PathsRepository implements IPathsRepository {
  private repository: Repository<Paths>;
  constructor() {
    this.repository = getRepository(Paths);
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  
  async create({
    route_id,
    initLat,
    finalLat,
    initLong,
    finalLong,
    id,
    isInitial,
    isFinal,
    isComplete,
    city_name,
    state
  }: ICreatePathDTO): Promise<Paths> {
    const path = this.repository.create({
      initLat,
      finalLat,
      initLong,
      finalLong,
      id,
      isFinal,
      isInitial,
      route_id,
      isComplete,
      city_name,
      state
    });
    await this.repository.save(path);
    return path;
  }

  async findByRouteId(route_id: string): Promise<Paths[]> {
    const pathVerify = await this.repository.find({ route_id });
    return pathVerify;
  }

  async findById(id: string): Promise<Paths> {
    const pathVerify = await this.repository.findOne(id);
    return pathVerify;
  }

}

export { PathsRepository };