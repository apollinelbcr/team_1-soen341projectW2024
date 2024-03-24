import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVehicleLocationDto {
    
    @IsOptional()
    zip_code:string;
    
    @IsOptional()
    airport_name:string;

    @IsNotEmpty()
    vehicle_id: string;

}