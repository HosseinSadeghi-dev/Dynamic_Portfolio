import {TasksType} from "../tasks.model";
import {BadRequestException, PipeTransform} from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = Object.values(TasksType)

    transform(value: any): any {

        if (!this.isStatusValid(value)) {
            throw new BadRequestException('status is invalid')
        }

        return value

    }

    private isStatusValid(status: any): boolean {
        const _idx: number = this.allowedStatuses.indexOf(status)
        return _idx !== -1
    }

}
