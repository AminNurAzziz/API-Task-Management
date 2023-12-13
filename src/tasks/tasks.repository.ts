import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TasksStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskEntityRepository: Repository<Task>,
    ) {}

    async findById(id: string, user: User): Promise<Task> {
        const found = await this.taskEntityRepository.findOne({
            where: { id, user },
        });
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async insert(createTaskDto: CreateTasksDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskEntityRepository.create({
            title,
            description,
            status: TasksStatus.OPEN,
            user,
        });
        await this.taskEntityRepository.save(task);
        return task;
    }

    async findAll(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.taskEntityRepository.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async deleteById(id: string, user: User): Promise<void> {
        const result = await this.taskEntityRepository.delete({ id, user });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(
        id: string,
        status: TasksStatus,
        user: User,
    ): Promise<Task> {
        const task = await this.findById(id, user);

        task.status = status;
        await this.taskEntityRepository.save(task);

        return task;
    }

    // async findOne(options?: any): Promise<Task> {
    //     return await this.taskEntityRepository.findOne(options);
    // }
}
