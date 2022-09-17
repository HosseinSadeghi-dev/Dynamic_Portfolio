import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "../services";
import {UserCredentialDto} from "../dto/user-credential.dto";
import {UserEntity} from "../entity";
import {handleResponse} from "../../shared/functions";
import {ResponseModel} from "../../shared/global.model";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../shared/decorators/get-user.decorator";

@Controller('/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('/sign-up')
    async signUp(
        @Body(ValidationPipe) userCredentialDto: UserCredentialDto
    ): Promise<ResponseModel> {
        await this.authService.signUp(userCredentialDto)
        return handleResponse('با موفقیت ثبت شد!')
    }

    @Post('/sign-in')
    signIn(
        @Body(ValidationPipe) userCredentialDto: UserCredentialDto
    ): Promise<UserEntity> {
        return this.authService.signIn(userCredentialDto)
    }

    @Get()
    @UseGuards(AuthGuard())
    checkToken(
        @GetUser() user: UserEntity,
    ): UserEntity {
        return user
    }

}
