import {Injectable, NotFoundException} from '@nestjs/common';
import {TasksModel, TasksType} from "./tasks.model";
import * as uuid from 'uuid'
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {

    private _tasks: TasksModel[] = [];

    getAllTasks(): TasksModel[] {
        return this._tasks
    }

    getOneTask(id: string): TasksModel {
        const _found: TasksModel = this._tasks.find(f => f.id === id)
        if (!_found) {
            throw new NotFoundException('task peida nashod')
        }
        return
    }

    deleteTask(id: string): void {
        this._tasks = this._tasks.filter(f => f.id !== id)
    }

    createNewTask(newTask: CreateTaskDto): TasksModel {
        const _task: TasksModel = {
            id: uuid.v4(),
            title: newTask.title,
            type: TasksType.open
        }
        this._tasks.push(_task);
        return _task
    }

}
