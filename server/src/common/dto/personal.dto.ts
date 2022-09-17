import {IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches} from "class-validator";

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

    @IsNotEmpty({message: 'فیلد سن نباید خالی باشد'})
    @IsNumberString({message: 'فرمت سن وارد شده صحیح نیست'})
    age: number;

    @IsNotEmpty({message: 'فیلد زبان نباید خالی باشد'})
    @IsString({message: 'زبان وارد شده صحیح نیست'})
    languages: string;

    @IsNotEmpty({message: 'فیلد ملیت نباید خالی باشد'})
    @IsString({message: 'ملیت وارد شده صحیح نیست'})
    nationality: string;

    @IsNotEmpty({message: 'فیلد توضیحات نباید خالی باشد'})
    @IsString({message: 'توضیحات وارد شده صحیح نیست'})
    desc: string;

    @IsOptional()
    @IsString({message: 'آدرس وارد شده صحیح نیست'})
    address: string;
}
