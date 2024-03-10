import { IsEnum } from "class-validator";
import { VehicleStatus } from "../vehicle-status.enum";

export class UpdateVehicleStatusDto{
    @IsEnum(VehicleStatus)
    status: VehicleStatus;
}