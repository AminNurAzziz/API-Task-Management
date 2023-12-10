// tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository'; // Import the repository
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, TasksRepository])],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule {}
