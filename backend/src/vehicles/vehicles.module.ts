import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicles.entity';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
