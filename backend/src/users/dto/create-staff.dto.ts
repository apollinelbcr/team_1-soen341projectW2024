import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../users-roles.enum";
import { UserStatus } from "../users-status.enum";

export class CreateStaffDto {
    
    @IsNotEmpty()
    first_name:string;
    
    @IsNotEmpty()
    last_name:string;

    @IsNotEmpty()
    email:string; 

    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole; //may be admin or customer service or other departments if we want to add any after that

    @IsNotEmpty()
    phone_number: string;

    @IsOptional()
    driver_license: string;

    @IsEnum(UserStatus)
    status: UserStatus;

}