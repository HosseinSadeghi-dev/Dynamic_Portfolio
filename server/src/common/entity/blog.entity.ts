import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {BlogStatus} from "../models/blog.model";


@Entity('blogs')
@Unique(['image'])
export class BlogEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    keywords: string;

    @Column({default: BlogStatus.published})
    status: BlogStatus;

    @Column()
    userNameEdited: string;

    @Column()
    userNameCreated: string;

    @Column({default: 0})
    seen: number;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({type: 'timestamp', array: true, nullable: true})
    seenDates: Date[]

    @Column({select: false, default: false})
    deleted: boolean;

    async moreSeen(): Promise<void> {
        this.seen += 1;
        if (this.seenDates) {
            this.seenDates.push(new Date())
        } else {
            this.seenDates = [new Date()]
        }
        await this.save();
    }
}
