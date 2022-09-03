import {Module} from '@nestjs/common';
import {TasksModule} from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./config/typeorm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TasksModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
