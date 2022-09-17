import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('socialMedia')
@Unique(['title'])
export class SocialMediaEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string

}
