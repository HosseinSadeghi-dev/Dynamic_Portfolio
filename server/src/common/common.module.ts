import {Module} from '@nestjs/common';
import * as config from 'config';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MulterModule} from "@nestjs/platform-express";
import {JwtStrategy} from "../shared/jwt/jwt.strategy";
import * as entities from "./entity"
import * as controllers from "./controllers"
import * as services from "./services"


const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn,
            },
        }),
        TypeOrmModule.forFeature(Object.values(entities)),
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: Object.values(controllers),
    providers: [
        ...Object.values(services),
        JwtStrategy
    ],
    exports: [JwtStrategy, PassportModule]
})
export class CommonModule {
}
