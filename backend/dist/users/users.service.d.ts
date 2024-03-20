import { CreateStaffDto } from './dto/create-staff.dto';
import { User } from './users.entity';
import { MongoRepository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserAdminDto } from './dto/update-user.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: MongoRepository<User>);
    createStaff(createStaffDto: CreateStaffDto): Promise<User>;
    createCustomer(createStaffDto: CreateCustomerDto): Promise<User>;
    getUserById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
    updateUserStaff(id: string, updateUsersDto: UpdateUserAdminDto): Promise<User>;
    updateUserCustomer(id: string, updateUsersDto: UpdateCustomerInfoDto): Promise<User>;
}
