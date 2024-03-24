
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Addons{
    
    @PrimaryGeneratedColumn('uuid') 
    id:string;

    @Column()
    addon_name:string;

    @Column()
    price: number;


}