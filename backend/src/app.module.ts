import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ReservationsModule } from './reservations/reservations.modules';
import { UsersModule } from './users/users.module';
import { VehiclesLocationsModule } from './vehicles_locations/vehicles_locations.module';

@Module({
  imports: [
    VehiclesModule, ReservationsModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'rentify',
      autoLoadEntities: true, //entities translate to tables ... 
      synchronize: true, // keep db schema in sync
    }),
    VehiclesLocationsModule,

  ]
})
export class AppModule {}







