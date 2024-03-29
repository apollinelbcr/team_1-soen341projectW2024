import { Extras } from "../reservations-extras.enum";
export declare class UpdateReservationDto {
    email: string;
    vehicle_name: string;
    pickup_date: string;
    pickup_time: string;
    dropoff_date: string;
    dropoff_time: string;
    pickup_location: string;
    dropoff_location: string;
    price: number;
    extras: Extras;
    isPaid?: string;
    isMadeBy?: string;
    isCheckedOut?: string;
}
