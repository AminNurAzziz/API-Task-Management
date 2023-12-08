import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './tasks.model'
import { createTaskDto } from './dto/create-task.dto'
import { filter } from 'rxjs'
import { GetTaskFilterDto } from './dto/get-task-filter-dto'
import { UpdateTaskStatusDto } from './dto/update-task.dto'
import { Console } from 'console'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        }
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    // With DTO
    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {
        const { title, description } = createTaskDto
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    }

    // Without DTO
    // @Post()
    // createTask(@Body('title') title, @Body('description') description): Task {
    //     return this.tasksService.createTask(title, description)
    // }
}
