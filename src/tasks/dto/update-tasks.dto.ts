import { TasksStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateTasksStatusDto {
    @IsEnum(TasksStatus)
    status: TasksStatus;
}
