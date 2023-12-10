import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { filter } from 'rxjs';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Console } from 'console';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
}
