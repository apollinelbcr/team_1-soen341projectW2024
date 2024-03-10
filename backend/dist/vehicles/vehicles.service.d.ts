import { MongoRepository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from './vehicle-status.enum';
import { Vehicle } from './vehicles.entity';
import { UpdateVehicleStatusDto } from './dto/update-vehicle-status.dto';
export declare class VehiclesService {
    private vehicleRepository;
    constructor(vehicleRepository: MongoRepository<Vehicle>);
    createTask(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    getVehicleById(id: string): Promise<Vehicle>;
    getAllvehicles(): Promise<Vehicle[]>;
    updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle>;
    updateVehicle(id: string, updateVehicleStatusDto: UpdateVehicleStatusDto): Promise<Vehicle>;
    deleteVehicle(id: string): Promise<void>;
}
