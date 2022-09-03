import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TaskType} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {TasksFilterDto} from "./dto/tasks-filter.dto";
import {Tasks} from "./task.entity";

@Controller('/tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {
    }

    @Get()
    async getAllTasks(
        @Query(ValidationPipe) filterDto: TasksFilterDto
    ): Promise<Tasks[]> {
        return this.tasksService.getTasks(filterDto)
    }


    @Get('/:id')
    async getOneTask(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Tasks> {
        return this.tasksService.createNewTask(createTaskDto)
    }

    // @Patch('/:id/type')
    // async updateTaskStatus(
    //     @Param('id') id:string,
    //     @Body('type', TaskStatusValidationPipe) type: TaskType
    // ): Promise<TaskModel> {
    //     return
    // }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

}
