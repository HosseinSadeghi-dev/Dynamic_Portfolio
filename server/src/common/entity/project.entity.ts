import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ProjectStatus} from "../models/project.model";


@Entity('projects')
@Unique(['image'])
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({nullable: true})
    image: string;

    // @Column({nullable: true})
    // technologies: string;
    //
    // @Column({nullable: true})
    // externalLink: string;
    //
    // @Column({nullable: true})
    // github: string;

    @Column({default: ProjectStatus.published})
    status: ProjectStatus;

    @Column({default: 0})
    seen: number;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({select: false, default: false})
    deleted: boolean;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    async moreSeen(): Promise<void> {
        this.seen += 1;
        await this.save();
    }
}
