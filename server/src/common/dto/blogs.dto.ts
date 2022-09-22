import {IS_STRING, IsIn, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {BlogStatus} from "../models/blog.model";

export class BlogsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    status: BlogStatus

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

export class BlogsDateFilter {

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

}

export class NewBlogDto {

    @IsNotEmpty({message: 'عنوان بلاگ نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات بلاگ نباید خالی باشد'})
    description: string

    @IsNotEmpty({message: 'کلمات کلیدی بلاگ نباید خالی باشد'})
    keywords: string

    @IsOptional()
    status: BlogStatus

}

export class EditBlogDto {

    @IsNotEmpty({message: 'عنوان بلاگ نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات بلاگ نباید خالی باشد'})
    description: string

    @IsNotEmpty({message: 'کلمات کلیدی بلاگ نباید خالی باشد'})
    keywords: string

    @IsOptional()
    imageDeleted: boolean

    @IsOptional()
    status: BlogStatus

}
