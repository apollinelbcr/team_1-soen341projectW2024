import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleStatusDto } from './dto/update-vehicle-status.dto';
import { Vehicle } from './vehicles.entity';
import { VehiclesService } from './vehicles.service';
import { VehicleStatus } from './vehicle-status.enum';

@Controller('vehicles')
export class VehiclesController {

    constructor(private vehiclesService: VehiclesService){}

    // -> URL to use http://localhost:3002/vehicles/

    //1. Create vehicle
    @Post()
    createVehicle(@Body() createVehicleDto : CreateVehicleDto) : Promise<Vehicle>{
        return this.vehiclesService.createVehicle(createVehicleDto); 
    }

    //2. Get Vehicle By ID
    @Get('/:id')
    getVehicleById(@Param('id') id: string) : Promise<Vehicle>{
        return this.vehiclesService.getVehicleById(id);
    }

    //3. Read All Vehicles 
    @Get()
    getAllvehicles() : Promise<Vehicle[]>{
        return this.vehiclesService.getAllvehicles();
    }

    //4. Update Vehicle 
     @Patch('/:id')
     updateVehicle(@Param('id') id: string, @Body() updateVehicleStatusDto: UpdateVehicleStatusDto): Promise<Vehicle> {
         return this.vehiclesService.updateVehicle(id, updateVehicleStatusDto);
     }

     //6. //4. Update Vehicle Status only
     @Patch('/:id/status')
     updateVehicleStatus(@Param('id') id: string, @Body() updateVehicleStatusDto: UpdateVehicleStatusDto) : Promise<Vehicle>{
         const { status } = updateVehicleStatusDto;
         return this.vehiclesService.updateVehicleStatus(id, status);
      }

    //5. Delete Vehicle
    @Delete('/:id')
    deleteVehicle(@Param('id') id: string) : Promise<void> {
         return this.vehiclesService.deleteVehicle(id);
     }

}
