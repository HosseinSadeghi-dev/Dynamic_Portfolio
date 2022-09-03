import {IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {UserRole} from "../user.model";
import {Transform} from "class-transformer";

export class UsersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    @IsIn([UserRole])
    role: UserRole

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageSize: number

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    pageNumber: number
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsIn([UserRole])
    role: UserRole
}

export class ChangeApproveStatusDto {
    @IsNotEmpty({message: 'وضعیت باید مقدار داشته باشد'})
    @IsBoolean({message: 'ورودی وضعیت صحیح نیست'})
    status: boolean
}
