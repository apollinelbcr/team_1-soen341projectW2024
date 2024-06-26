import { Vehicle } from "src/vehicles/vehicles.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle_Location{
    
    @PrimaryGeneratedColumn()
    id:string;

    @Column({nullable: true})
    zip_code?:string;

    @Column({nullable: true})
    airport_name?: string;

    @Column({nullable: true})
    branch_name: string;
    
    @Column({nullable: true})
    branch_address: string;

    @Column()
    vehicle_id: string;

}