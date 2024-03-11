import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: MongoRepository<User>);
    createTask(createUserDto: CreateUserDto): Promise<User>;
    getUserById(id: string): Promise<User>;
    getAllusers(): Promise<User[]>;
    updateUserStatus(id: string, status: UserStatus): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
