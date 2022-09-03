import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./user.entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Pagination} from "../../shared/paginate";
import {CreateUserDto, UsersFilterDto} from "./dto/users.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private authService: AuthService
    ) {
    }

    async getUsers(query: UsersFilterDto): Promise<Pagination<User>> {
        const qb: SelectQueryBuilder<User> = this.usersRepository
            .createQueryBuilder('user')
            .andWhere('(user.deleted = false)')

        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);
        query.searchText && qb.andWhere('(user.username LIKE :username)', {username: `%${query.searchText}%`})
        query.role && qb.andWhere('(user.role = :role)', {role: query.role})

        return new Pagination<User> ({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async getUserById(id: number): Promise<User> {
        const _found: User = await this.usersRepository.findOneBy({id: id})
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
                .update(User)
                .set({ deleted: true })
                .where("id = :id", { id: id })
                .execute()
        }
    }

    async changeApproveUser(id: number, approveStatus: boolean): Promise<any> {
        if (await this.getUserById(id)) {
            return await this.usersRepository
                .createQueryBuilder()
                .update(User)
                .set({ approved: approveStatus })
                .where("id = :id", { id: id })
                .execute()
        }
    }

}
