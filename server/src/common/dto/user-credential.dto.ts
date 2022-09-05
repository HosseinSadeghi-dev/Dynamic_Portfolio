import {IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {UserRole} from "../models/user.model";

export class UserCredentialDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    // at least 1 uppercase, at least 1 lowercase, at least 1number or special character
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password is too weak'}
    )
    password: string;

    @IsOptional()
    @IsIn([UserRole])
    role: UserRole
}
