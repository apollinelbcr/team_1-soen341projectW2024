import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from "./task-status-enum";
import {CreateTaskDto} from "./dto/create-task.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import { MongoRepository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: MongoRepository<Task>,
    ) {
    }
    async getTaskById(id: string): Promise<Task> {
        // @ts-ignore
        const found = await this.tasksRepository.findOne(id);

        if(!found) {
            throw new NotFoundException('Reservation with ID "${id}" not found');
        }
        return found;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { idvehicle, username, pickupdate, dropoffdate, pickuploc, dropoffloc } = createTaskDto;

        const task = this.tasksRepository.create({
            idvehicle,
            username,
            pickupdate,
            dropoffdate,
            pickuploc,
            dropoffloc,
            status: TaskStatus.NOT_RESERVED,
        });
        await this.tasksRepository.save(task);
        return task;
    }
    async getAllTasks() : Promise<Task[]> {
        const found = await this.tasksRepository.find();
        return found;
    }
    async updateTaskStatus(id: string, status: TaskStatus) : Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status; //affecting the new status
        await this.tasksRepository.save(task)
        return task;
    }

    async deleteTask(id:string) : Promise<void> {
        const result = await this.tasksRepository.delete(id);
        //console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`Reservation with ID ${id} is not found`);
        }
    }
}
