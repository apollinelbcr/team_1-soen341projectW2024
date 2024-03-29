import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Extras } from './reservations-extras.enum'; 

@Entity('reservations')
export class Reservation {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    vehicle_name: string;

    @Column({ type: 'date' })
    pickup_date: string;

    @Column({ type: 'varchar', length: 8 })
    pickup_time: string;

    @Column({ type: 'date' })
    dropoff_date: string;

    @Column({ type: 'varchar', length: 8 })
    dropoff_time: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    pickup_location: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    dropoff_location: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extras: string;

    @Column({ type: 'enum', enum: ['admin', 'customer', 'customer service'], default: 'customer' })
    isMadeBy: string;

    @Column({ type: 'enum', enum: ['true', 'false'], default: 'false' })
    isPaid: string;

    @Column({ type: 'enum', enum: ['true', 'false'], default: 'false' })
    isCheckedOut: string;

    @Column({ nullable: true })
    userName:string;

    @Column({ nullable: true })
    userName2:string;
    
    @Column({ nullable: true })
    userPhone:string;

    @Column({ nullable: true })
    userLicense:string;

    @Column({ nullable: true })
    vehicleName:string;

    @Column({ nullable: true })
    vehicleType:string;

    @Column({ nullable: true })
    vehicleCategory:string;

    @Column({ nullable: true })
    vehicleTransmission:string;
}
