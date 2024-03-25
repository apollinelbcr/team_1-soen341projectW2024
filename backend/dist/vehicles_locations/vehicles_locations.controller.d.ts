import { VehiclesLocationsService } from './vehicles_locations.service';
import { Vehicle_Location } from './vehicles_locations.entity';
import { CreateVehicleLocationDto } from './dto/create-locveh.dto';
import { UpdateVehicleLocationDto } from './dto/update-locveh.dto';
export declare class VehiclesLocationsController {
    private vehicleslocationsService;
    constructor(vehicleslocationsService: VehiclesLocationsService);
    createVehicleLocation(createVehicleLocationDto: CreateVehicleLocationDto): Promise<Vehicle_Location>;
    getAllVehicleLocations(): Promise<Vehicle_Location[]>;
    getVehicleLocationById(id: string): Promise<Vehicle_Location>;
    updateVehicleLocation(id: string, updateVehicleLocationDto: UpdateVehicleLocationDto): Promise<Vehicle_Location>;
    getVehicleLocationsByParam(param: string): Promise<Vehicle_Location[]>;
    deleteVehicleLocation(id: string): Promise<void>;
}
