import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    VehiclesModule,
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
  ]
})
export class AppModule {}
