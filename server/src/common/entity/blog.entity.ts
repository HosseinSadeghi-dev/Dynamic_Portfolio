import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BlogStatus} from "../models/blog.model";


@Entity('blogs')
export class BlogEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    file: string;

    @Column({nullable: true})
    description: string;

    @Column({default: BlogStatus.published})
    status: BlogStatus;

    @Column()
    userNameEdited: string;

    @Column()
    userNameCreated: string;

    @Column({default: 0})
    seen: number;

    // @Column({default: 0})
    // liked: number;

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
