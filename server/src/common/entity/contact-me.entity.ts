import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ContactMeDto} from "../dto/contact-me.dto";

@Entity('contact-me')
export class ContactMeEntity extends BaseEntity{

    constructor(
        contactMeDto: ContactMeDto
    ) {
        super();
        this.fullName = contactMeDto?.fullName
        this.email = contactMeDto?.email
        this.subject = contactMeDto?.subject
        this.message = contactMeDto?.message
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    subject: string;

    @Column()
    message: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

}
