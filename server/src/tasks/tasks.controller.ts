import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TasksModel, TasksType} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {TasksFilterDto} from "./dto/tasks-filter.dto";

@Controller('/tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {
    }

    @Get()
    async getAllTasks(
        @Query(ValidationPipe) filterDto: TasksFilterDto
    ): Promise<TasksModel[]> {
        if (Object.keys(filterDto).length) {
            // return service with handling tasks with filter
        }
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    async getOneTask(@Param('id') id: string): Promise<TasksModel> {
        return this.tasksService.getOneTask(id)
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<TasksModel> {
        return this.tasksService.createNewTask(createTaskDto)
    }

    @Patch('/:id/type')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('type', TaskStatusValidationPipe) type: TasksType
    ): TasksModel {
        return
    }

}
