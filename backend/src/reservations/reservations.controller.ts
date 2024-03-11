import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservations.entity';
import { ReservationsService } from './reservations.service';
import { Extras } from "./reservations-extras.enum";


@Controller('reservations')
export class ReservationsController {

    constructor(private reservationsService: ReservationsService){}

    // -> URL to use http://localhost:3000/reservations/

    //1. Create reservations
    @Post()
    createTask(@Body() createReservationDto : CreateReservationDto) : Promise<Reservation>{
        return this.reservationsService.createTask(createReservationDto); 
    }

     //2. Get Reservations By ID
    @Get('/:id')
    getReservationById(@Param('id') id: string) : Promise<Reservation>{
        return this.reservationsService.getReservationById(id);
    }

    //3. Read All Reservations 
    @Get()
    getAllreservations() : Promise<Reservation[]>{
        return this.reservationsService.getAllreservations();
    }

    //5. Delete Reservations
    @Delete('/:id')
    deleteReservations(@Param('id') id: string) : Promise<void> {
         return this.reservationsService.deleteReservations(id);
     }

     //4. Update Vehicle 
     @Patch('/:id')
     updateVehicle(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
         return this.reservationsService.updateVehicle(id, updateReservationDto);
     }

}