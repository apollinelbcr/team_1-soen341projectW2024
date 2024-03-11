import { IsEnum, IsNotEmpty } from "class-validator";
import { VehicleCategories } from "../vehicle-categories.enum";
import { VehicleTransmissions } from "../vehicle-transmissions.enum";
import { VehicleTypes } from "../vehicle-types.enum";

export class CreateVehicleDto {
    
    @IsNotEmpty()
    name_vehicle: string;
    
    @IsNotEmpty()
    image: string;

    @IsEnum(VehicleTypes)
    vehicle_type: string;

    @IsEnum(VehicleCategories)
    vehicle_category: string;

    @IsEnum(VehicleTransmissions)
    vehicle_transmission: string;

    //vehicle status is by default available
}