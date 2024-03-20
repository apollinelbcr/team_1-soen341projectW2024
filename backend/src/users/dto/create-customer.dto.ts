import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../users-roles.enum";
import { UserStatus } from "../users-status.enum";

export class CreateCustomerDto {
    
    @IsNotEmpty()
    first_name:string;
    
    @IsNotEmpty()
    last_name:string;

    @IsNotEmpty()
    email:string; 

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    driver_license: string;


}