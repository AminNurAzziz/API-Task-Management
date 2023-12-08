export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
}

export enum TaskStatus {
    OPEN = 'OPEN', // 0
    IN_PROGRESS = 'IN_PROGRESS', // 1
    DONE = 'DONE', // 2
}
