import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {SettingDto} from "../dto/setting.dto";

@Entity('setting')
export class SettingEntity extends BaseEntity {

    constructor(
        settingDto?: SettingDto
    ) {
        super();
        this.primaryColor = settingDto?.primaryColor
        this.accentColor = settingDto?.accentColor
        this.font = settingDto?.font
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    primaryColor: string;

    @Column()
    accentColor: string;

    @Column()
    font: string;

    @Column({nullable: true})
    logo: string;

}
