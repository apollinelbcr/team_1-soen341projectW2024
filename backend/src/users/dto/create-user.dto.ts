import { IsEnum, IsNotEmpty } from "class-validator";
import { UserCategories } from "../user-categories.enum";
import { UserTransmissions } from "../user-transmissions.enum";
import { UserTypes } from "../user-types.enum";

export class CreateUserDto {
    
    @IsNotEmpty()
    name_user: string;
    
    @IsNotEmpty()
    image: string;

    @IsEnum(UserTypes)
    user_type: string;

    @IsEnum(UserCategories)
    user_category: string;

    @IsEnum(UserTransmissions)
    user_transmission: string;

    //user status is by default available
}