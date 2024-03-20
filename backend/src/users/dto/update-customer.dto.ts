import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../users-roles.enum";
import { UserStatus } from "../users-status.enum";

export class UpdateCustomerInfoDto {

    @IsNotEmpty()
    email:string; 

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone_number: string;

}