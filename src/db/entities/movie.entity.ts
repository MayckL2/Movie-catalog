import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'movie'})
export class MovieEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'varchar'})
    name: string;
    
    @Column({type: 'varchar'})
    description: string;
    
    @Column({type: 'int'})
    duration: number;
    
    @Column({type: 'int'})
    classification: number;
}