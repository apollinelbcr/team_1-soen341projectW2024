import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task-status-enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    idvehicle: string;

    @Column()
    username: string;

    @Column()
    pickuploc: string;

    @Column()
    dropoffloc: string;

    @Column()
    pickupdate: string;

    @Column()
    dropoffdate: string;

    @Column()
    status: TaskStatus;
}