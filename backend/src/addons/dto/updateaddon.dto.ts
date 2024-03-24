import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAddonDto {
    
    @IsNotEmpty()
    price:number;
    
}