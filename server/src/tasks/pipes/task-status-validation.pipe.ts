import {TaskType} from "../task.model";
import {BadRequestException, PipeTransform} from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = Object.values(TaskType)

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
