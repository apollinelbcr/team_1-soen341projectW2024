import { VehicleCategories } from "./vehicle-categories.enum";
import { VehicleStatus } from "./vehicle-status.enum";
import { VehicleTransmissions } from "./vehicle-transmissions.enum";
import { VehicleTypes } from "./vehicle-types.enum";
export declare class Vehicle {
    id: string;
    name_vehicle: string;
    image: string;
    vehicle_type: VehicleTypes;
    vehicle_category: VehicleCategories;
    vehicle_transmission: VehicleTransmissions;
    status: VehicleStatus;
}
