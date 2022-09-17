import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {BlogStatus} from "../models/blog.model";
import {Transform} from "class-transformer";

export class ContactMeFilterDto {
    @IsOptional()
    @IsNotEmpty()
    sort: string;

    @IsOptional()
    sortType: "ASC" | "DESC"

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageSize: number

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageNumber: number
}

export class ContactMeDto {
    @IsNotEmpty({message: 'نام و نام خانوادگی نباید خالی باشد'})
    @IsString({message: 'نام و نام خانوادگی وارد شده صحیح نیست'})
    fullName: string;

    @IsNotEmpty({message: 'ایمیل نباید خالی باشد'})
    @IsEmail({message: 'ایمیل وارد شده صحیح نیست'})
    email: string;

    @IsNotEmpty({message: 'موضوع نباید خالی باشد'})
    @IsString({message: 'موضوع وارد شده صحیح نیست'})
    subject: string;

    @IsNotEmpty({message: 'پیام نباید خالی باشد'})
    @IsString({message: 'پیام وارد شده صحیح نیست'})
    message: string;
}
