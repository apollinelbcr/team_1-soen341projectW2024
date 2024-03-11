import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserStatus } from "./user-status.enum";


@Entity()
export class User{
    
    @PrimaryGeneratedColumn('uuid') //auto generates the id for our tasks
    id:string;

    @Column()
    name_user:string;

    @Column()
    image:string; //url link or path to img

    @Column()
    user_email: string;
    
    @Column()
    user_phone: string;

    @Column()
    user_password: string;

    @Column()
    status:UserStatus;

}