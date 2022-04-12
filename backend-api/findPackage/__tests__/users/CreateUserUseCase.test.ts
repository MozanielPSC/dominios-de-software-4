import "reflect-metadata"
import { ICreateUsersDTO } from "../../src/modules/accounts/dtos/ICreateUsersDTO";
import { User } from "../../src/modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../src/modules/accounts/repositories/IUsersRepository";
import {CreateUserUseCase} from "../../src/modules/accounts/useCases/createUser/CreateUserUseCase";
class FakeUserRepository implements IUsersRepository {
    users: User[] = [];
    async create(data:ICreateUsersDTO):Promise<User> {
        const user = {...data,created_at:new Date(),id:"salve",isAdmin:false,isDriver:false,isEnterprise:false,avatar:null};
        this.users.push(user);
        return user;
    }
    async findByEmail(email:string):Promise<User> {
       return this.users.find(user => user.email === email);
    }
    async findById(id:string):Promise<User> {
        throw new Error('Not implemented')
    }
    async search(query:string):Promise<User[]> {
        throw new Error('Not implemented')
    }
    async findAll():Promise<User[]> {
        throw new Error('Not implemented')
    }
}
describe("Should be able to create an User",() => {

    test('Should return a AppError if invalid email',async()=>{
        const usersRepository = new FakeUserRepository();
        const useCase = new CreateUserUseCase(usersRepository);
        expect(useCase.execute(({username:'name',password:'123', email:'teste'} as any))).rejects
        .toEqual({ message: "Invalid email", statusCode: 400 })
    });
    test('Should return a AppError if user already exists',async()=>{
        const usersRepository = new FakeUserRepository();
        const useCase = new CreateUserUseCase(usersRepository);
        await useCase.execute(({username:'name',password:'123', email:'teste@gmail.com'}))
        expect(useCase.execute(({username:'name',password:'123', email:'teste@gmail.com'} as any))).rejects
        .toEqual({ message: "User already exists", statusCode: 400 })
    });
    test('Should return a new User on success',async()=>{
        const usersRepository = new FakeUserRepository();
        const useCase = new CreateUserUseCase(usersRepository);
        const result = await useCase.execute(({username:'name',password:'123', email:'teste@gmail.com'} as any));
        expect(result.username);
        expect(result.email).toEqual('teste@gmail.com');
    });
});