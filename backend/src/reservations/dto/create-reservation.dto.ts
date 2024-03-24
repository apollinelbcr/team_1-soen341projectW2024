import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Extras } from '../reservations-extras.enum';

export class CreateReservationDto {
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    vehicle_name: string;

    @IsDateString()
    pickup_date: string;

    @IsString()
    @IsNotEmpty()
    pickup_time: string;

    @IsDateString()
    dropoff_date: string;

    @IsString()
    @IsNotEmpty()
    dropoff_time: string;

    @IsString()
    @IsNotEmpty()
    pickup_location: string;

    @IsString()
    @IsNotEmpty()
    dropoff_location: string;

    
    price: number;

    @IsEnum(Extras)
    extras: Extras;

    @IsEnum(['admin', 'customer', 'customer service'])
    isMadeBy: string;

    @IsEnum(['true', 'false'])
    isPaid: string;

    @IsEnum(['true', 'false'])
    isCheckedOut: string;

    userName:string;

    userName2:string;

    userPhone:string;

    userLicense:string;

    vehicleName:string;

    vehicleType:string;

    vehicleCategory:string;

    vehicleTransmission:string;
}