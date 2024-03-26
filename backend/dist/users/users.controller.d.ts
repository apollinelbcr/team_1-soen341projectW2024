import { UsersService } from './users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { User } from './users.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserAdminDto } from './dto/update-user.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createStaff(createStaffDto: CreateStaffDto): Promise<User>;
    createCustomer(createCustomerDto: CreateCustomerDto): Promise<User>;
    getUsersById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
    updateUserStaff(id: string, updateUserAdminDto: UpdateUserAdminDto): Promise<User>;
    updateUserCustomer(id: string, updateCustomerInfoDto: UpdateCustomerInfoDto): Promise<User>;
    loginUser(email: string, password: string): Promise<{
        message: string;
        user: User;
    } | {
        message: string;
        user?: undefined;
    }>;
    findUserByEmail(email: string): Promise<{
        message: string;
        user: User;
    } | {
        message: string;
        user?: undefined;
    }>;
}
