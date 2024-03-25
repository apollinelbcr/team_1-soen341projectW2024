import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle_Location } from './vehicles_locations.entity';
import { MongoRepository } from 'typeorm';
import { CreateVehicleLocationDto } from './dto/create-locveh.dto';
import { UpdateVehicleLocationDto } from './dto/update-locveh.dto';

@Injectable()
export class VehiclesLocationsService {
    constructor(
        @InjectRepository(Vehicle_Location)
        private vehcilelocationRepository: MongoRepository<Vehicle_Location>
    ){}

    async createVehicleLocation(createvehcilelocationdto: CreateVehicleLocationDto): Promise<Vehicle_Location> {
        const { zip_code, airport_name, branch_name, branch_adress, vehicle_id } = createvehcilelocationdto;
        const vehiclelocation = this.vehcilelocationRepository.create({
            zip_code, airport_name, branch_name, branch_adress, vehicle_id
        } as Partial<Vehicle_Location>); 

        await this.vehcilelocationRepository.save(vehiclelocation);
        return vehiclelocation;
    }
        
    async getAllVehicleLocations() : Promise<Vehicle_Location[]> {
        const found = await this.vehcilelocationRepository.find();
        return found;
    }

    async getVehicleLocationById(id: string) : Promise<Vehicle_Location> {
        const found = await this.vehcilelocationRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`Location ${id} is not found`);
        }
        return found;
    }

    async getVehicleLocationsByParam(param: string): Promise<Vehicle_Location[]> {
        const foundLocations = await this.vehcilelocationRepository.find({
            where: [
                { zip_code: param },
                { airport_name: param }
            ],
        });
    
        if (!foundLocations) {
            throw new NotFoundException(`No locations found matching '${param}'`);
        }
    
        return foundLocations;
    }
    

    async updateVehicleLocation(id: string, updateVehicleLocationDto: UpdateVehicleLocationDto): Promise<Vehicle_Location> {
        const vehicle_location = await this.getVehicleLocationById(id);
        
        if (updateVehicleLocationDto.zip_code !== undefined) {
            vehicle_location.zip_code = updateVehicleLocationDto.zip_code;
        }
        if (updateVehicleLocationDto.airport_name !== undefined) {
            vehicle_location.airport_name = updateVehicleLocationDto.airport_name;
        }
        if (updateVehicleLocationDto.branch_name !== undefined) {
            vehicle_location.branch_name = updateVehicleLocationDto.branch_name;
        }
        if (updateVehicleLocationDto.branch_adress !== undefined) {
            vehicle_location.branch_adress = updateVehicleLocationDto.branch_adress;
        }
        if (updateVehicleLocationDto.vehicle_id !== undefined) {
            vehicle_location.vehicle_id = updateVehicleLocationDto.vehicle_id;
        }

        await this.vehcilelocationRepository.save(vehicle_location);
        return vehicle_location;
    }

    async deleteVehicleLocation(id:string) : Promise<void> {
        const result = await this.vehcilelocationRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Location with ID ${id} is not found`);
        }
    }



}
