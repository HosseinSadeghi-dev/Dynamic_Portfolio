import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class SettingDto {

    @IsNotEmpty({message: 'فیلد اسم نباید خالی باشد'})
    @IsString({message: 'اسم وارد شده صحیح نیست'})
    fullName: string

    @IsNotEmpty({message: 'فیلد شماره تلفن نباید خالی باشد'})
    @Matches(
        /^\+(?:[0-9]●?){1,14}[0-9]$/,
        {message: 'شماره تلفن وارد شده صحیح نیست، با کد کشوری وارد کنید'}
    )
    phoneNumber: string

    @IsNotEmpty({message: 'فیلد ایمیل نباید خالی باشد'})
    @IsEmail({message: 'ایمیل وارد شده صحیح نیست'})
    email: string

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
