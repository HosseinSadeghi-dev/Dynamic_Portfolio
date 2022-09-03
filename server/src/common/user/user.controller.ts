import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, ValidationPipe} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Pagination} from "../../shared/paginate";
import {ChangeApproveStatusDto, UsersFilterDto} from "./dto/users.dto";
import {handleResponse} from "../../shared/functions";

@Controller('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    async getAllUsers(
        @Query(ValidationPipe) usersQuery: UsersFilterDto
    ): Promise<Pagination<User>> {
        return await this.userService.getUsers(usersQuery)
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<any> {
        return await this.userService.deleteUser(id)
    }

    @Patch('approve/:id')
    async changeApproveStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) approveStatus: ChangeApproveStatusDto
    ): Promise<any> {
        await this.userService.changeApproveUser(id, approveStatus.status)
        return handleResponse('با موفقیت ثبت شد!')
    }

}
