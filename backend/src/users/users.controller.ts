import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { User } from './users.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserAdminDto } from './dto/update-user.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    //Add staff >> done by staff only
    @Post('/admin/')
    createStaff(@Body() createStaffDto : CreateStaffDto) : Promise<User>{
        return this.usersService.createStaff(createStaffDto); 
    }

    //Add Customer >> done by customer / create account
    @Post()
    createCustomer(@Body() createCustomerDto : CreateCustomerDto) : Promise<User>{
        return this.usersService.createCustomer(createCustomerDto); 
    }

    //Get user by ID
    @Get('/:id')
    getUsersById(@Param('id') id: string) : Promise<User>{
        return this.usersService.getUserById(id);
    }

    //Get all users
    @Get()
    getAllUsers() : Promise<User[]>{
        return this.usersService.getAllUsers();
    }

    //Delete a specific user
    @Delete('/:id')
    deleteUser(@Param('id') id: string) : Promise<void> {
         return this.usersService.deleteUser(id);
    }

    //Update User >> admin
    @Patch('/:id')
    updateUserStaff(@Param('id') id: string, @Body() updateUserAdminDto: UpdateUserAdminDto): Promise<User> {
         return this.usersService.updateUserStaff(id, updateUserAdminDto);
     }

    //Updare User >> customer
    @Patch('/:id')
    updateUserCustomer(@Param('id') id: string, @Body() updateCustomerInfoDto: UpdateCustomerInfoDto): Promise<User> {
         return this.usersService.updateUserCustomer(id, updateCustomerInfoDto);
     }


}