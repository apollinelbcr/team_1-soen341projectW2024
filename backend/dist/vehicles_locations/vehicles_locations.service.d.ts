import { Vehicle_Location } from './vehicles_locations.entity';
import { MongoRepository } from 'typeorm';
import { CreateVehicleLocationDto } from './dto/create-locveh.dto';
import { UpdateVehicleLocationDto } from './dto/update-locveh.dto';
export declare class VehiclesLocationsService {
    private vehcilelocationRepository;
    constructor(vehcilelocationRepository: MongoRepository<Vehicle_Location>);
    createVehicleLocation(createvehcilelocationdto: CreateVehicleLocationDto): Promise<Vehicle_Location>;
    getAllVehicleLocations(): Promise<Vehicle_Location[]>;
    getVehicleLocationById(id: string): Promise<Vehicle_Location>;
    getVehicleLocationsByParam(param: string): Promise<Vehicle_Location[]>;
    updateVehicleLocation(id: string, updateVehicleLocationDto: UpdateVehicleLocationDto): Promise<Vehicle_Location>;
    deleteVehicleLocation(id: string): Promise<void>;
}
