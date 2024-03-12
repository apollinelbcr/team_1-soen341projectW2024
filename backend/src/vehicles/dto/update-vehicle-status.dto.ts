import { IsEnum, IsNotEmpty } from "class-validator";
import { VehicleStatus } from "../vehicle-status.enum";
import { VehicleTypes } from "../vehicle-types.enum";
import { VehicleCategories } from "../vehicle-categories.enum";
import { VehicleTransmissions } from "../vehicle-transmissions.enum";

export class UpdateVehicleStatusDto{
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

    @IsEnum(VehicleStatus)
    status: VehicleStatus;

    @IsNotEmpty()
    price: number;



}