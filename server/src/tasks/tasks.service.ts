import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskType} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Tasks} from "./task.entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TasksFilterDto} from "./dto/tasks-filter.dto";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) {
    }


    async getTasks(filterDto?: TasksFilterDto): Promise<Tasks[]> {
        const {searchText, type} = filterDto;
        const query: SelectQueryBuilder<Tasks> = this.tasksRepository.createQueryBuilder('task');

        if (searchText) {
            query.andWhere('(task.title LIKE :title)', {title: `%${searchText}%`})
        }


        if (type) {
            query.andWhere('task.type = :type', {type})
        }

        return await query.getMany()
    }

    async getTaskById(id: number): Promise<Tasks | null> {
        const _found: Tasks = await this.tasksRepository.findOneBy({id: id})
        if (!_found) {
            throw new NotFoundException('task peida nashod')
        }
        return _found
    }

    async createNewTask(newTask: CreateTaskDto): Promise<Tasks> {
        const _task = new Tasks();
        _task.title = newTask.title;
        return await _task.save();
    }

    async deleteTask(id: number): Promise<any> {
        return await this.tasksRepository
            .createQueryBuilder()
            .delete()
            .from(Tasks)
            .where("id = :id", {id: id})
            .execute()
        // const _found: Tasks = await this.getTaskById(id)
        // if (!_found) {
        //     throw new NotFoundException('task peida nashod')
        // }
        // return await this.tasksRepository.delete(id)
    }

}
