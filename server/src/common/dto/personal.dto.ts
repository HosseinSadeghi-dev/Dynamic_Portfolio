import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class PersonalDto {
    @IsNotEmpty({message: 'فیلد اسم نباید خالی باشد'})
    @IsString({message: 'اسم وارد شده صحیح نیست'})
    fullName: string;

    @IsNotEmpty({message: 'فیلد شماره تلفن نباید خالی باشد'})
    @Matches(
        /^\+(?:[0-9]●?){1,14}[0-9]$/,
        {message: 'شماره تلفن وارد شده صحیح نیست، با کد کشوری وارد کنید'}
    )
    phoneNumber: string;

    @IsNotEmpty({message: 'فیلد ایمیل نباید خالی باشد'})
    @IsEmail({message: 'ایمیل وارد شده صحیح نیست'})
    email: string;

    @IsNotEmpty({message: 'فیلد حوزه فعالیت نباید خالی باشد'})
    @IsString({message: 'حوزه فعالیت وارد شده صحیح نیست'})
    mainField: string;
}
