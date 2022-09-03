import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TaskType} from "./task.model";

@Entity()
export class Tasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: TaskType.open, nullable: true})
    type: TaskType

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }
}
