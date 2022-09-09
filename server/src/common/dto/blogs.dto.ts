import {IsIn, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {BlogStatus} from "../models/blog.model";

export class BlogsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    @IsIn([BlogStatus])
    status: BlogStatus

    @IsOptional()
    @IsNotEmpty()
    createdBy: string;

    @IsOptional()
    @IsNotEmpty()
    editedBy: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageSize: number

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageNumber: number
}

export class NewBlogDto {

    @IsNotEmpty({message: 'عنوان بلاگ نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات بلاگ نباید خالی باشد'})
    description: string

    @IsOptional()
    @IsIn([BlogStatus])
    status: BlogStatus

}

export class EditBlogDto {

    @IsNotEmpty({message: 'عنوان بلاگ نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات بلاگ نباید خالی باشد'})
    description: string

    @IsOptional()
    imageDeleted: boolean

    @IsOptional()
    @IsIn([BlogStatus])
    status: BlogStatus

}
