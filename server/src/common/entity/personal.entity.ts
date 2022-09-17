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
    age: number;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    languages: string;

    @Column({nullable: true})
    nationality: string;

    @Column({nullable: true})
    cv: string;

    @Column({nullable: true})
    mainField: string;

    @Column({nullable: true})
    desc: string

    @Column({nullable: true})
    address: string

}
