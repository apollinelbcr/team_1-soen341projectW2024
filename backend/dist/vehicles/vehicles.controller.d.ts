import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleStatusDto } from './dto/update-vehicle-status.dto';
import { Vehicle } from './vehicles.entity';
import { VehiclesService } from './vehicles.service';
export declare class VehiclesController {
    private vehiclesService;
    constructor(vehiclesService: VehiclesService);
    createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    getVehicleById(id: string): Promise<Vehicle>;
    getAllvehicles(): Promise<Vehicle[]>;
    updateVehicle(id: string, updateVehicleStatusDto: UpdateVehicleStatusDto): Promise<Vehicle>;
    updateVehicleStatus(id: string, updateVehicleStatusDto: UpdateVehicleStatusDto): Promise<Vehicle>;
    deleteVehicle(id: string): Promise<void>;
}
