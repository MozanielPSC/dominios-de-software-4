import { IPathsRepository } from "../../repositories/IPathsRepository";
import { ICreatePathDTO } from "../../dtos/ICreatePathDTO";
import { getRepository, Repository } from "typeorm";
import { Paths } from "../typeorm/entities/Paths";

class PathsRepository implements IPathsRepository {
  private repository: Repository<Paths>;
  constructor() {
    this.repository = getRepository(Paths);
  }


  async create({ route_id,
    initLat,
    finalLat,
    initLong,
    finalLong,
    id,
    isInitial,
    isFinal
  }: ICreatePathDTO): Promise<Paths> {
    const path = this.repository.create({
      initLat,
      finalLat,
      initLong,
      finalLong,
      id,
      isFinal,
      isInitial
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