import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from "../services";
import {UserCredentialDto} from "../dto/user-credential.dto";
import {UserEntity} from "../entity";
import {handleResponse} from "../../shared/functions";
import {ResponseModel} from "../../shared/global.model";

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

}
