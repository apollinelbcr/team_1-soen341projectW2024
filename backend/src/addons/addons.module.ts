import { Module } from '@nestjs/common';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';
import { Addons } from './addons.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Addons])],
  controllers: [AddonsController],
  providers: [AddonsService]
})
export class AddonsModule {}
