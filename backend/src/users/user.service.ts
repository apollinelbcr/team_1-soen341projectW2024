import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: MongoRepository<User>, //instance of the user rep
    ) {};

    //1. Create a user - PG
    async createTask(createUserDto: CreateUserDto): Promise<User> {
        const { name_user, image, user_email, user_phone, user_password } = createUserDto;
        const user = this.userRepository.create({
            name_user, image, user_email, user_phone, user_password, status: UserStatus.ACTIVE
        } as Partial<User>); // Explicit casting to Partial<User>

        await this.userRepository.save(user);
        return user;
    }

    //2. Get User by Id
    async getUserById(id: string) : Promise<User> {
        const found = await this.userRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`User ${id} is not found`);
        }
        return found;
    }

    //3. Read All Users 

    async getAllusers() : Promise<User[]> {
        const found = await this.userRepository.find();
        return found;
    }

    //4. Update User Status
    async updateUserStatus(id: string, status: UserStatus) : Promise<User> {
         const user = await this.getUserById(id);
         user.status = status; //affecting the new status
         await this.userRepository.save(user)
         return user;
     }

    //5. Delete User    
    async deleteUser(id:string) : Promise<void> {
        const result = await this.userRepository.delete(id);
        //console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`User with ID ${id} is not found`);
        }
    }


}
