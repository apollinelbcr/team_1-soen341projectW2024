import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    // -> URL to use http://localhost:3000/users/

    //1. Create user
    @Post()
    createTask(@Body() createUserDto : CreateUserDto) : Promise<User>{
        return this.usersService.createTask(createUserDto); 
    }

    //2. Get User By ID
    @Get('/:id')
    getUserById(@Param('id') id: string) : Promise<User>{
        return this.usersService.getUserById(id);
    }

    //3. Read All Users 
    @Get()
    getAllusers() : Promise<User[]>{
        return this.usersService.getAllusers();
    }

    //4. Update User Status
    @Patch('/:id/status')
    updateUserStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) : Promise<User>{
        const { status } = updateUserStatusDto;
        return this.usersService.updateUserStatus(id, status);
     }

    //5. Delete User
    @Delete('/:id')
    deleteUser(@Param('id') id: string) : Promise<void> {
         return this.usersService.deleteUser(id);
     }

}
