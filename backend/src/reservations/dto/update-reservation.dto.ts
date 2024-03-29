import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsNumber,IsBoolean, MaxLength} from 'class-validator';
import { Extras } from "../reservations-extras.enum";
import { Type } from "class-transformer";

export class UpdateReservationDto {

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    vehicle_name: string;

    @IsDateString()
    @IsOptional()
    pickup_date: string;

    @IsString()
    @IsOptional()
    pickup_time: string;

    @IsDateString()
    @IsOptional()
    dropoff_date: string;

    @IsString()
    @IsOptional()
    dropoff_time: string;

    @IsString()
    @IsOptional()
    pickup_location: string;

    @IsString()
    @IsOptional()
    dropoff_location: string;

    @IsOptional()
    price: number;

    @IsEnum(Extras)
    @IsOptional()
    extras: Extras;

    @IsEnum(['true', 'false'])
    @IsOptional()
    isPaid?: string;

    @IsOptional()
    @IsEnum(['admin', 'customer', 'customer service'])
    isMadeBy?: string;

    @IsEnum(['true', 'false'])
    @IsOptional()
    isCheckedOut?: string ;


}