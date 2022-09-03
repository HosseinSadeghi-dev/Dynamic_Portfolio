import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {TasksModule} from "./tasks/tasks.module";
import { UserModule } from './user/user.module';

const _modules = [
    TasksModule,
    AuthModule
]

@Module({
    imports: [
        ...Object.values(_modules),
        UserModule,
    ],
    controllers: [],
    providers: [],
    exports: [
        ...Object.values(_modules),
    ]
})
export class CommonModule {
}
