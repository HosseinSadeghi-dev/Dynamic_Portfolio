import {IsIn, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {ProjectStatus} from "../models/project.model";

export class ProjectsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    status: ProjectStatus

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

export class NewProjectDto {

    @IsNotEmpty({message: 'عنوان پروژه نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات پروژه نباید خالی باشد'})
    description: string

    @IsNotEmpty({message: 'کلمات کلیدی پروژه نباید خالی باشد'})
    keywords: string

    @IsNotEmpty({message: 'لینک پروژه نباید خالی باشد'})
    externalLink: string

    @IsOptional()
    status: ProjectStatus

}

export class EditProjectDto {

    @IsNotEmpty({message: 'عنوان پروژه نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات پروژه نباید خالی باشد'})
    description: string

    @IsNotEmpty({message: 'کلمات کلیدی پروژه نباید خالی باشد'})
    keywords: string

    @IsNotEmpty({message: 'لینک پروژه نباید خالی باشد'})
    externalLink: string

    @IsOptional()
    imageDeleted: boolean

    @IsOptional()
    status: ProjectStatus

}
