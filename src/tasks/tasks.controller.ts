import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    // UseGuards,
    applyDecorators,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTasksStatusDto } from './dto/update-tasks.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
const guards = process.env.STAGE === 'dev' ? [] : [AuthGuard];

@Controller('tasks')
@applyDecorators(...guards)
// @UseGuards(process.env.STAGE === 'dev' ? undefined : AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTasksDto,
        @GetUser() user: User,
    ): Promise<Task> {
        console.log(
            'createTaskDto' + createTaskDto.title,
            createTaskDto.description,
            user,
        );
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTasksStatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
