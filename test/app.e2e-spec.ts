import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/tasks (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/tasks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/tasks/:id (GET)', async () => {
        // Assuming there is a task with ID 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35' in your database
        const taskId = 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35';
        const response = await request(app.getHttpServer()).get(
            `/tasks/${taskId}`,
        );
        expect(response.status).toBe(200);
        // Add more specific assertions based on your application logic
    });

    it('/tasks (POST)', async () => {
        // Assuming you have a valid task object for testing
        const newTask = {
            title: 'Test task',
            description: 'Test description',
        };

        const response = await request(app.getHttpServer())
            .post('/tasks')
            .send(newTask);
        expect(response.status).toBe(201);
        // Add more specific assertions based on your application logic
    });

    it('/tasks/:id/status (PATCH)', async () => {
        // Assuming there is a task with ID 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35' in your database
        const taskId = 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35';
        // Assuming you have a valid update object for testing
        const updateStatus = {
            status: 'DONE',
        };

        const response = await request(app.getHttpServer())
            .patch(`/tasks/${taskId}/status`)
            .send(updateStatus);
        expect(response.status).toBe(200);
        // Add more specific assertions based on your application logic
    });

    // it('/tasks/:id (DELETE)', async () => {
    //     // Assuming there is a task with ID 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35' in your database
    //     const taskId = 'b26328d4-7eee-4aa6-b17e-5b807d7f0b35';
    //     const response = await request(app.getHttpServer()).delete(
    //         `/tasks/${taskId}`,
    //     );
    //     expect(response.status).toBe(200);
    //     // Add more specific assertions based on your application logic
    // });

    afterAll(async () => {
        await app.close();
    });
});
