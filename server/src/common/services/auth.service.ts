import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../entity";
import {UserCredentialDto} from "../dto/user-credential.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {ErrorCodeEnum} from "../../shared/error-code.enum";
import {JwtPayload} from "../../shared/jwt/jwt-payload.interface";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
    }

    private static async _hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
        const user = new UserEntity()
        user.username = userCredentialDto.username
        user.salt = await bcrypt.genSalt();
        user.password = await AuthService._hashPassword(userCredentialDto.password, user.salt);

        try {
            await user.save()
        } catch (error) {
            if (error.code === ErrorCodeEnum.duplicate) {
                throw new ConflictException('این نام کاربری از قبل وجود دارد!');
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    async signIn(userCredentialDto: UserCredentialDto): Promise<UserEntity> {
        try {
            const user: UserEntity = await this.usersRepository.findOne({
                where: {
                    username: userCredentialDto.username,
                    deleted: false
                }
            })

            if (!user) {
                throw new UnauthorizedException('لطفا نام کاربری و رمز عبور خود را چک کنید')
            }

            const username: string = await user.validatePassword(userCredentialDto.password)

            if (!user.approved) {
                throw new UnauthorizedException('نام کاربری شما تایید نشده است')
            }

            const payload: JwtPayload = {username}
            user.accessToken = await this.jwtService.sign(payload)

            user.salt = user.password = undefined
            await user.updateLastOnline();

            return user
        } catch (error) {
            throw error
        }
    }

}
