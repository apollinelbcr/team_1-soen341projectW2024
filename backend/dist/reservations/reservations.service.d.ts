import { MongoRepository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservations.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
export declare class ReservationsService {
    private reservationRepository;
    constructor(reservationRepository: MongoRepository<Reservation>);
    createTask(createReservationDto: CreateReservationDto): Promise<Reservation>;
    getReservationById(id: string): Promise<Reservation>;
    getAllreservations(): Promise<Reservation[]>;
    deleteReservations(id: string): Promise<void>;
    updateVehicle(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
}
