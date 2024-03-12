import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from './vehicle-status.enum';
import { Vehicle } from './vehicles.entity';

@Injectable()
export class VehiclesService {

    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: MongoRepository<Vehicle>, //instance of the vehicle rep
    ) {};

    //1. Create a vehicle - PG
    async createTask(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const { name_vehicle, image, vehicle_type, vehicle_category, vehicle_transmission } = createVehicleDto;
        const vehicle = this.vehicleRepository.create({
            name_vehicle, image, vehicle_type, vehicle_category, vehicle_transmission, status: VehicleStatus.AVAILABLE
        } as Partial<Vehicle>); // Explicit casting to Partial<Vehicle>

        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }

    //2. Get Vehicle by Id
    async getVehicleById(id: string) : Promise<Vehicle> {
        const found = await this.vehicleRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`Vehicle ${id} is not found`);
        }
        return found;
    }

    //3. Read All Vehicles 

    async getAllvehicles() : Promise<Vehicle[]> {
        const found = await this.vehicleRepository.find();
        return found;
    }

    //4. Update Vehicle Status
    async updateVehicleStatus(id: string, status: VehicleStatus) : Promise<Vehicle> {
         const vehicle = await this.getVehicleById(id);
         vehicle.status = status; //affecting the new status
         await this.vehicleRepository.save(vehicle)
         return vehicle;
     }

    //5. Delete Vehicle    
    async deleteVehicle(id:string) : Promise<void> {
        const result = await this.vehicleRepository.delete(id);
        //console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`Vehicle with ID ${id} is not found`);
        }
    }


}
