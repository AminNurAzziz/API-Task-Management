import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './tasks-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TasksStatus;

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    user: User;
}
