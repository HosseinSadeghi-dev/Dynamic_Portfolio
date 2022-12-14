import {BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UserRole} from "../models/user.model";
import * as bcrypt from 'bcrypt';
import {UnauthorizedException} from "@nestjs/common";

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({default: UserRole.admin, nullable: true})
    role: UserRole

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', nullable: true})
    lastOnline: Date;

    @Column({select: false, default: false})
    deleted: boolean;

    @Column({default: false})
    approved: boolean;

    async updateLastOnline(): Promise<void> {
        this.lastOnline = new Date();
        await this.save()
    }

    accessToken: string;

    async validatePassword(password: string): Promise<string> {
        if (this.password != await bcrypt.hash(password, this.salt)) {
            throw new UnauthorizedException('لطفا نام کاربری و رمز عبور خود را چک کنید')
        }
        return this.username
    }

}
