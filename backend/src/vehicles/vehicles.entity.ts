import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { VehicleCategories } from "./vehicle-categories.enum";
import { VehicleStatus } from "./vehicle-status.enum";
import { VehicleTransmissions } from "./vehicle-transmissions.enum";
import { VehicleTypes } from "./vehicle-types.enum";

@Entity()
export class Vehicle{
    
    @PrimaryGeneratedColumn('uuid') //auto generates the id for our tasks
    id:string;

    @Column()
    name_vehicle:string;

    @Column()
    image:string; //url link or path to img

    @Column()
    vehicle_type: VehicleTypes;
    
    @Column()
    vehicle_category: VehicleCategories;

    @Column()
    vehicle_transmission: VehicleTransmissions;

    @Column()
    status:VehicleStatus;

}