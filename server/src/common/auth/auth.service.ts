import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {UserCredentialDto} from "./dto/user-credential.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {ErrorCodeEnum} from "../../shared/error-code.enum";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    private static async _hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async signUp(userCredentialDto: UserCredentialDto): Promise<void> {
        const user = new User()
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

    async signIn(userCredentialDto: UserCredentialDto): Promise<User> {
        try {
            const user: User = await this.usersRepository.createQueryBuilder("user")
                .andWhere("user.username = :username", {username: userCredentialDto.username})
                .andWhere("user.deleted = false")
                .getOneOrFail()

            if (!user.approved) {
                throw new UnauthorizedException('نام کاربری شما تایید نشده است')
            }

            user.accessToken = await this.jwtService.sign(await user.validatePassword(userCredentialDto.password))

            return user
        } catch (error) {
            throw new UnauthorizedException(!error.response ? 'لطفا نام کاربری و رمز عبور خود را چک کنید' : error.response)
        }
    }

}
