import {IsNotEmpty, IsString} from "class-validator";

export class SocialMediaDto {
    @IsNotEmpty({message: 'عنوان شبکه اجتماعی نباید خالی باشد'})
    title: string

    @IsString()
    link: string
}
