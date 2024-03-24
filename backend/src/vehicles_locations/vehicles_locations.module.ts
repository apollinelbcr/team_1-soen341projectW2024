import { Module } from '@nestjs/common';
import { VehiclesLocationsController } from './vehicles_locations.controller';
import { VehiclesLocationsService } from './vehicles_locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle_Location } from './vehicles_locations.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Vehicle } from 'src/vehicles/vehicles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle_Location, Vehicle])],
  controllers: [VehiclesLocationsController],
  providers: [VehiclesLocationsService, VehiclesService]
})
export class VehiclesLocationsModule {}
