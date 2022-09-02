export interface TasksModel {
    id: string,
    title: string,
    type: TasksType
}

export enum TasksType {
    open,
    close
}
