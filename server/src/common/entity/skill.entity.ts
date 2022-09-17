import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {SkillDto} from "../dto/skill.dto";

@Entity('skill')
export class SkillEntity extends BaseEntity {

    constructor(skillDto: SkillDto) {
        super();
        this.title = skillDto?.title
        this.progress = skillDto?.progress;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: 100})
    progress: number;

    @Column({default: false})
    deleted:boolean

}
