import {IsBoolean, IsNotEmpty, IsOptional} from "class-validator";

export class SocialMediaDto {
    @IsNotEmpty({message: 'عنوان شبکه اجتماعی نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'لینک شبکه اجتماعی نباید خالی باشد'})
    link: string

    @IsBoolean()
    @IsOptional()
    imageDeleted: boolean
}
