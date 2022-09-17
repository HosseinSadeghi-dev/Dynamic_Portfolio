import {IsNotEmpty, IsNumberString, IsPositive, IsString, Max, Min} from "class-validator";

export class SkillDto {
    @IsNotEmpty({message: 'فیلد عنوان نباید خالی باشد'})
    @IsString({message: 'اسم وارد شده صحیح نیست'})
    title: string;

    @IsNotEmpty({message: 'فیلد درصد پیشرفت نباید خالی باشد'})
    progress: number;
}
