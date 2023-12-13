import { Injectable } from '@nestjs/common';
import { TasksStatus } from './tasks-status.enum';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(private taskEntityRepository: TaskRepository) {}

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskEntityRepository.findAll(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        return this.taskEntityRepository.findById(id, user);
    }

    createTask(createTaskDto: CreateTasksDto, user: User): Promise<Task> {
        return this.taskEntityRepository.insert(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        return this.taskEntityRepository.deleteById(id, user);
    }

    async updateTaskStatus(
        id: string,
        status: TasksStatus,
        user: User,
    ): Promise<Task> {
        return this.taskEntityRepository.updateTaskStatus(id, status, user);
    }
}
