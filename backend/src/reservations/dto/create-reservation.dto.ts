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
}
