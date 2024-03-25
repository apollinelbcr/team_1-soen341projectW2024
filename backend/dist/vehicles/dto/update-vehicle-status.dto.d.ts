import { VehicleStatus } from "../vehicle-status.enum";
export declare class UpdateVehicleStatusDto {
    name_vehicle: string;
    image: string;
    vehicle_type: string;
    vehicle_category: string;
    vehicle_transmission: string;
    status: VehicleStatus;
    price: number;
}
