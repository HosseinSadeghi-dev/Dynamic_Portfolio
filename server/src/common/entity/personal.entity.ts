import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('personal')
export class PersonalEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    mainField: string;

    @Column({nullable: true})
    fullDesc: string

    @Column({nullable: true})
    shortDesc: string

}
