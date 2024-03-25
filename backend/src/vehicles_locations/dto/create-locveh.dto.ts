import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Vehicle } from "src/vehicles/vehicles.entity";

export class CreateVehicleLocationDto {
    
    @IsOptional()
    zip_code:string;
    
    @IsOptional()
    airport_name:string;

    @IsNotEmpty()
    vehicle_id: string;

}