import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Hossein1379',
    database: 'dynamic_portfolio',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}
