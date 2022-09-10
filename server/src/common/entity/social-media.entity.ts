import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('socialMedia')
export class SocialMediaEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    logo: string;

    @Column()
    title: string;

    @Column()
    link: string

    @Column({default: false})
    deleted: boolean

}
