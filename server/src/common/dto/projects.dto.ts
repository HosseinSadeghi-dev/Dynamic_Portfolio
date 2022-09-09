import {IsIn, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {ProjectStatus} from "../models/project.model";

export class ProjectsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    @IsIn([ProjectStatus])
    status: ProjectStatus

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

    @IsOptional()
    @IsIn([ProjectStatus])
    status: ProjectStatus

}

export class EditProjectDto {

    @IsNotEmpty({message: 'عنوان پروژه نباید خالی باشد'})
    title: string

    @IsNotEmpty({message: 'توضیحات پروژه نباید خالی باشد'})
    description: string

    @IsOptional()
    imageDeleted: boolean

    @IsOptional()
    @IsIn([ProjectStatus])
    status: ProjectStatus

}
