import { Vehicle } from "src/vehicles/vehicles.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle_Location{
    
    @PrimaryGeneratedColumn('uuid') 
    id:string;

    @Column({nullable: true})
    zip_code?:string;

    @Column({nullable: true})
    airport_name?: string;

    @Column()
    vehicle_id: string;

}