import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservations.entity';
import { ReservationsService } from './reservations.service';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    createTask(createReservationDto: CreateReservationDto): Promise<Reservation>;
    getReservationById(id: string): Promise<Reservation>;
    getAllreservations(): Promise<Reservation[]>;
    deleteReservations(id: string): Promise<void>;
    updateVehicle(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
}
