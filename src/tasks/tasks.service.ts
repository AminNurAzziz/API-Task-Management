import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './tasks-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    // tasks.service.ts
    constructor(
        @InjectRepository(Task) private tasksRepository: TasksRepository,
    ) {}

    getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async getTasksWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.tasksRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` },
            );
        }
        const tasksF = await query.getMany();
        return tasksF;
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasksF = this.getAllTasks();
    //     if (status) {
    //         tasksF = tasksF.filter((task) => task.status === status);
    //     }
    //     if (search) {
    //         tasksF = tasksF.filter(
    //             (task) =>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search),
    //         );
    //     }
    //     return tasksF;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        return this.tasksRepository.save(task);
    }

    deleteTask(id: string): Promise<Task> {
        const found = this.getTaskById(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        this.tasksRepository.delete(id);
        return found;
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const found = await this.getTaskById(id);
        found.status = status;
        await this.tasksRepository.save(found);
        return found;
    }
}

// TODO: WIHTOUT REPOSITORY , USING ENTITY MANAGER
/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(private entityManager: EntityManager) {}

    async getAllTasks(): Promise<Task[]> {
        return this.entityManager.find(Task);
    }

    async getTasksWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.entityManager.createQueryBuilder(Task, 'task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` },
            );
        }

        return query.getMany();
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.entityManager.findOne(Task, { where: { id } });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.entityManager.create(Task, {
            title,
            description,
            status: TaskStatus.OPEN,
        });

        return this.entityManager.save(Task, task);
    }

    async deleteTask(id: string): Promise<Task> {
        const found = await this.getTaskById(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        await this.entityManager.delete(Task, id);

        return found;
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const found = await this.getTaskById(id);
        found.status = status;

        await this.entityManager.save(Task, found);

        return found;
    }
}

*/
