import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserAdminDto } from './dto/update-user.dto';
import { UserStatus } from './users-status.enum';
import { UpdateCustomerInfoDto } from './dto/update-customer.dto';
import { UserRole } from './users-roles.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: MongoRepository<User>,
    ){}

    //1. Create a user -- staff
    async createStaff(createStaffDto: CreateStaffDto): Promise<User> {
        const { first_name, last_name, email, password, role, phone_number, driver_license } = createStaffDto;
        const staff = this.userRepository.create({
            first_name, last_name, email, password, role, phone_number, driver_license, status: UserStatus.ACTIVE
        } as Partial<User>);

        await this.userRepository.save(staff);
        return staff;
    }

    //2. Create a user -- customer
    async createCustomer(createCustomer: CreateCustomerDto): Promise<User | null> {

        const { first_name, last_name, email, password, phone_number, driver_license } = createCustomer;
        let existingUser = await this.userRepository.findOne({ where: { email, role: 'CUSTOMER' } });
        if (existingUser){
            throw new HttpException(
                'Email already exists',
                HttpStatus.CONFLICT,
              );
        } ;
        const customer = this.userRepository.create({
            first_name, last_name, email, password, role: UserRole.CUSTOMER, phone_number, driver_license, status: UserStatus.ACTIVE
        } as Partial<User>); 

        await this.userRepository.save(customer);
        return customer;
    }

    //3. Get User by Id
    async getUserById(id: string) : Promise<User> {
        const found = await this.userRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`User with ID ${id} is not found`);
        }
        return found;
    }

    //4. Read All Users 
    async getAllUsers() : Promise<User[]> {
        const found = await this.userRepository.find();
        return found;
    }

    //5. Delete User    
    async deleteUser(id:string) : Promise<void> {
        const result = await this.userRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`User with ID ${id} is not found`);
        }
    }

    //6. Update User staff
    async updateUserStaff(id: string, updateUsersDto: UpdateUserAdminDto): Promise<User> {
        const user = await this.getUserById(id);
        
        // Update each field if provided in the DTO
        if (updateUsersDto.last_name !== undefined) {
            user.last_name = updateUsersDto.last_name;
        }
        if (updateUsersDto.first_name !== undefined) {
            user.first_name = updateUsersDto.first_name;
        }
        if (updateUsersDto.email !== undefined) {
            user.email = updateUsersDto.email;
        }
        if (updateUsersDto.password !== undefined) {
            user.password = updateUsersDto.password;
        }
        if (updateUsersDto.role !== undefined) {
            user.role = updateUsersDto.role as UserRole;
        }
        if (updateUsersDto.phone_number !== undefined) {
            user.phone_number = updateUsersDto.phone_number;
        }
        if (updateUsersDto.driver_license !== undefined) {
            user.driver_license = updateUsersDto.driver_license;
        }
        if (updateUsersDto.status !== undefined) {
            user.status = updateUsersDto.status as UserStatus;
        }
        
        await this.userRepository.save(user);
        return user;
    }

    //6. Update User - customer // cannot modify everything
    async updateUserCustomer(id: string, updateUsersDto: UpdateCustomerInfoDto): Promise<User> {
        const user = await this.getUserById(id);
        
        if (updateUsersDto.email !== undefined) {
            user.email = updateUsersDto.email;
        }
        if (updateUsersDto.password !== undefined) {
            user.password = updateUsersDto.password;
        }
        if (updateUsersDto.phone_number !== undefined) {
            user.phone_number = updateUsersDto.phone_number;
        }

        await this.userRepository.save(user);
        return user;
    }

    //login service method - Customer Only
    async loginCustomer(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email, password, role: 'CUSTOMER' } });
        return user || null;
      }

    //Find by email - check if email exist before signing up
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email, role: 'CUSTOMER' } });
        return user || null;
      }

}
