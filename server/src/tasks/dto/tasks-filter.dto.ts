import {TaskType} from "../task.model";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class TasksFilterDto {
    @IsOptional()
    @IsNotEmpty()
    searchText: string;

    @IsOptional()
    @IsIn(Object.values(TaskType))
    type: TaskType
}
