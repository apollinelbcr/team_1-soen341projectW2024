import { IsEnum, IsNotEmpty } from "class-validator";


export class CreateUserDto {
    
    @IsNotEmpty()
    name_user: string;
    
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    user_email: string;

    @IsNotEmpty()
    user_phone: string;

    @IsNotEmpty()
    user_password: string;

    //user status is by default active
}