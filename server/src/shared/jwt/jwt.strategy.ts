import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as config from 'config'
import {UserEntity} from "../../common/entity";
import {Repository} from "typeorm";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const {username} = payload;
        const user = await this.usersRepository.findOne({where: {username: username}});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
