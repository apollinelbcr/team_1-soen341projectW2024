import { Extras } from '../reservations-extras.enum';
export declare class CreateReservationDto {
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
    isMadeBy: string;
    isPaid: string;
    isCheckedOut: string;
    userName: string;
    userName2: string;
    userPhone: string;
    userLicense: string;
    vehicleName: string;
    vehicleType: string;
    vehicleCategory: string;
    vehicleTransmission: string;
}
