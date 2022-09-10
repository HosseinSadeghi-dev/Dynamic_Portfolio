import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class SettingDto {

    @IsNotEmpty({message: 'فیلد رنگ اصلی نباید خالی باشد'})
    @Matches(
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        {message: 'رنگ وارد شده صحیح نیست !'}
    )
    primaryColor: string

    @IsNotEmpty({message: 'فیلد رنگ دوم نباید خالی باشد'})
    @Matches(
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        {message: 'رنگ وارد شده صحیح نیست !'}
    )
    accentColor: string

    @IsNotEmpty({message: 'فیلد فونت نباید خالی باشد'})
    @IsString({message: 'فونت وارد شده صحیح نیست'})
    font: string


}
