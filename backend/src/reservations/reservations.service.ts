import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservations.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Extras } from "./reservations-extras.enum";


@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: MongoRepository<Reservation>, //instance of the vehicle rep
    ) {}

    //1. Create a reservation 
    async createTask(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const { email,vehicle_name,pickup_date,pickup_time, dropoff_date, dropoff_time,pickup_location,dropoff_location,price,extras } = createReservationDto;
        const reservation = this.reservationRepository.create({
            email,vehicle_name,pickup_date,pickup_time, dropoff_date, dropoff_time,pickup_location,dropoff_location,price,extras
        }   as Partial<Reservation>); 

        await this.reservationRepository.save(reservation);
        return reservation;
    }

    //2. Get Reservations by Id
    async getReservationById(id: string) : Promise<Reservation> {
        const found = await this.reservationRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`Reservation ${id} is not found`);
        }
        return found;
    }
    
    //3. Read All Reservations 
    async getAllreservations() : Promise<Reservation[]> {
        const found = await this.reservationRepository.find();
            console.log(found); // Log found reservations
        return found;
}
    
    //4. Delete Reservations    
    async deleteReservations(id:string) : Promise<void> {
        const result = await this.reservationRepository.delete(id);
        //console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`Vehicle with ID ${id} is not found`);
        }
    }

    async updateVehicle(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
        const reservation = await this.getReservationById(id);
        
        // Update each field if provided in the DTO
        if (updateReservationDto.email !== undefined) {
            reservation.email = updateReservationDto.email;
        }

        if (updateReservationDto.vehicle_name !== undefined) {
            reservation.vehicle_name = updateReservationDto.vehicle_name;
        }

        if (updateReservationDto.pickup_date !== undefined) {
            reservation.pickup_date = updateReservationDto.pickup_date.toString();
        }


        if (updateReservationDto.dropoff_date !== undefined) {
            reservation.dropoff_date = updateReservationDto.dropoff_date.toString();
        }


        if (updateReservationDto.pickup_time !== undefined) {
            reservation.pickup_time = updateReservationDto.pickup_time;
        }
        
        if (updateReservationDto.dropoff_time !== undefined) {
            reservation.dropoff_time = updateReservationDto.dropoff_time;
        }

        if (updateReservationDto.pickup_location !== undefined) {
            reservation.pickup_location = updateReservationDto.pickup_location;
        }

        if (updateReservationDto.dropoff_location !== undefined) {
            reservation.dropoff_location = updateReservationDto.dropoff_location;
        }
        if (updateReservationDto.pickup_time !== undefined) {
            reservation.pickup_time = updateReservationDto.pickup_time; // Update to pickup_time
        }
        
        if (updateReservationDto.dropoff_time !== undefined) {
            reservation.dropoff_time = updateReservationDto.dropoff_time; // Update to dropoff_time
        }        

        if (updateReservationDto.price !== undefined) {
            reservation.price = updateReservationDto.price;
        }
        
        if (updateReservationDto.extras !== undefined) {
            reservation.extras = updateReservationDto.extras as Extras;
        }
        
        // Save the updated vehicle
        await this.reservationRepository.save(reservation);
        return reservation;
    }

}
