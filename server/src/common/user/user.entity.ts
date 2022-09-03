import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UserRole} from "./user.model";
import * as bcrypt from 'bcrypt';
import {UnauthorizedException} from "@nestjs/common";
import {Exclude} from "class-transformer";

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({select: false})
    @Exclude()
    password: string;

    @Column({select: false})
    @Exclude()
    salt: string;

    @Column({default: UserRole.admin, nullable: true})
    role: UserRole

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({select: false, default: false})
    deleted: boolean;

    @Column({default: false})
    approved: boolean;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    accessToken: string

    async validatePassword(password: string): Promise<string> {
        if (this.password !== await bcrypt.hash(password, this.salt)) {
            throw new UnauthorizedException('لطفا نام کاربری و رمز عبور خود را چک کنید')
        }
        return this.username
    }

}
