import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { User } from './user.entity';
import { UsersService } from './user.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createTask(createUserDto: CreateUserDto): Promise<User>;
    getUserById(id: string): Promise<User>;
    getAllusers(): Promise<User[]>;
    updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
