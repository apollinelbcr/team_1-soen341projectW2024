import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAddonDto {
    
    @IsNotEmpty()
    addon_name:string;
    
    @IsNotEmpty()
    price:number;
    
}