import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserCategories } from "./user-categories.enum";
import { UserStatus } from "./user-status.enum";
import { UserTransmissions } from "./user-transmissions.enum";
import { UserTypes } from "./user-types.enum";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn('uuid') //auto generates the id for our tasks
    id:string;

    @Column()
    name_user:string;

    @Column()
    image:string; //url link or path to img

    @Column()
    user_type: UserTypes;
    
    @Column()
    user_category: UserCategories;

    @Column()
    user_transmission: UserTransmissions;

    @Column()
    status:UserStatus;

}