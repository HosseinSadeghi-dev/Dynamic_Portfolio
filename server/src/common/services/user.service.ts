import {Injectable, NotFoundException} from '@nestjs/common';
import {UserEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Pagination} from "../../shared/paginate";
import {CreateUserDto, UsersFilterDto} from "../models/users.dto";
import {AuthService} from "./auth.service";
import {UserRole} from "../models/user.model";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {
    }

    async getUsers(query: UsersFilterDto): Promise<Pagination<UserEntity>> {
        const qb: SelectQueryBuilder<UserEntity> = this.usersRepository
            .createQueryBuilder('user')
            .andWhere('(user.deleted = false)')

        query.searchText && qb.andWhere('(user.username LIKE :username)', {username: `%${query.searchText}%`})
        query.role && qb.andWhere('(user.role = :role)', {role: query.role})
        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        return new Pagination<UserEntity> ({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async getUserById(id: number): Promise<UserEntity> {
        const _found: UserEntity = await this.usersRepository.findOneBy({id: id})
        if (!_found) {
            throw new NotFoundException('کاربر مورد نظر پیدا نشد!')
        }
        return _found
    }

    async createNewUser(newUser: CreateUserDto): Promise<void> {
        return await this.authService.signUp({
            username: newUser.username,
            password: newUser.password,
            role: newUser.role
        })
    }

    async deleteUser(id: number): Promise<any> {
        if (await this.getUserById(id)) {
            return await this.usersRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set({ deleted: true })
                .where("id = :id", { id: id })
                .execute()
        }
    }

    async changeApproveUser(id: number, approveStatus: boolean): Promise<any> {
        if (await this.getUserById(id)) {
            return await this.usersRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set({ approved: approveStatus })
                .where("id = :id", { id: id })
                .execute()
        }
    }

    async changeUserRole(id: number, userRole: UserRole): Promise<any> {
        if (await this.getUserById(id)) {
            return await this.usersRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set({ role: userRole })
                .where("id = :id", { id: id })
                .execute()
        }
    }

}
