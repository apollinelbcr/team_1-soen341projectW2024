import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./users-roles.enum";
import { UserStatus } from "./users-status.enum";


@Entity()
export class User{
    
    @PrimaryGeneratedColumn('uuid') 
    id:string;

    @Column()
    first_name:string;
    
    @Column()
    last_name:string;

    @Column()
    email:string; 
    
    @Column()
    password: string;

    @Column()
    role: UserRole;
    
    @Column()
    phone_number: string;

    @Column()
    driver_license: string;
    
    @Column()
    status: UserStatus;

}