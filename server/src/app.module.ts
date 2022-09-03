import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./config/typeorm.config";
import {CommonModule} from "./common/common.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        CommonModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
