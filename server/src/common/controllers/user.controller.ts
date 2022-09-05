import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch, Post,
    Query,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {UserService} from "../services";
import {UserEntity} from "../entity";
import {Pagination} from "../../shared/paginate";
import {ChangeApproveStatusDto, ChangeUserRoleDto, CreateUserDto, UsersFilterDto} from "../models/users.dto";
import {handleResponse} from "../../shared/functions";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../shared/decorators/get-user.decorator";
import {ResponseModel} from "../../shared/global.model";

@Controller('/users')
@UseGuards(AuthGuard())
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    async getAllUsers(
        @GetUser() user: UserEntity,
        @Query(ValidationPipe) usersQuery: UsersFilterDto
    ): Promise<Pagination<UserEntity>> {
        console.log('user', user)
        return await this.userService.getUsers(usersQuery)
    }

    @Post()
    async createNewUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<ResponseModel> {
        await this.userService.createNewUser(createUserDto)
        return handleResponse('با موفقیت اضافه شد!')
    }

    @Patch('approve/:id')
    async changeApproveStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) approveStatus: ChangeApproveStatusDto
    ): Promise<ResponseModel> {
        await this.userService.changeApproveUser(id, approveStatus.status)
        return handleResponse('با موفقیت ثبت شد!')
    }

    @Patch('role/:id')
    async changeUserRole(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) userRole: ChangeUserRoleDto
    ): Promise<ResponseModel> {
        await this.userService.changeUserRole(id, userRole.role)
        return handleResponse('با موفقیت ثبت شد!')
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<any> {
        return await this.userService.deleteUser(id)
    }

}
