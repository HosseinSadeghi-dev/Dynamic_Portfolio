import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {SettingDto} from "../dto/setting.dto";

@Entity('setting')
export class SettingEntity extends BaseEntity {

    constructor(
        settingDto?: SettingDto
    ) {
        super();

        this.fullName = settingDto?.fullName
        this.phoneNumber = settingDto?.phoneNumber
        this.email = settingDto?.email
        this.primaryColor = settingDto?.primaryColor
        this.accentColor = settingDto?.accentColor
        this.font = settingDto?.font
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    primaryColor: string;

    @Column()
    accentColor: string;

    @Column()
    font: string;

}
