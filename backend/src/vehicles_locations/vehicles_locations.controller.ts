import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { VehiclesLocationsService } from './vehicles_locations.service';
import { Vehicle_Location } from './vehicles_locations.entity';
import { CreateVehicleLocationDto } from './dto/create-locveh.dto';
import { UpdateVehicleLocationDto } from './dto/update-locveh.dto';

@Controller('vehicles-locations')
export class VehiclesLocationsController {
    constructor(private vehicleslocationsService: VehiclesLocationsService){}

    @Post()
    createVehicleLocation(@Body() createVehicleLocationDto : CreateVehicleLocationDto) : Promise<Vehicle_Location>{
        return this.vehicleslocationsService.createVehicleLocation(createVehicleLocationDto); 
    }

    @Get()
    getAllVehicleLocations() : Promise<Vehicle_Location[]>{
        return this.vehicleslocationsService.getAllVehicleLocations();
    }

    @Get(':id')
    async getVehicleLocationById(@Param('id') id: string): Promise<Vehicle_Location> {
        try {
            const vehicleLocation = await this.vehicleslocationsService.getVehicleLocationById(id);
            return vehicleLocation;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Internal server error'); 
            }
        }
    }

    @Patch('/:id')
    updateVehicleLocation(@Param('id') id: string, @Body() updateVehicleLocationDto: UpdateVehicleLocationDto): Promise<Vehicle_Location> {
        return this.vehicleslocationsService.updateVehicleLocation(id, updateVehicleLocationDto);
    }

    @Get('param/:param')
    async getVehicleLocationsByParam(@Param('param') param: string): Promise<Vehicle_Location[]> {
        try {
            const vehicleLocations = await this.vehicleslocationsService.getVehicleLocationsByParam(param);
            return vehicleLocations;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            } else {
                throw new InternalServerErrorException('Internal server error'); // Handle other errors as per your requirements
            }
        }
    }

    @Delete('/:id')
    deleteVehicleLocation(@Param('id') id: string) : Promise<void> {
         return this.vehicleslocationsService.deleteVehicleLocation(id);
     }

}
