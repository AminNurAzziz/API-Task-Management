// TODO test use snapshot
// import * as request from 'supertest';
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';

// import { AppModule } from '../src/app.module';

// describe('TasksController (e2e)', () => {
//     let app: INestApplication;

//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AppModule],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });

//     it('/tasks (POST)', async () => {
//         const newTask = {
//             title: 'Test task',
//             description: 'Test description',
//         };

//         const response = await request(app.getHttpServer())
//             .post('/tasks')
//             .send(newTask);

//         expect(response.status).toBe(201);

//         // You might want to capture and store a snapshot here
//         // Example: capture the response body and compare it with a stored snapshot
//         const responseBodySnapshot = {
//             ...response.body,
//             id: 'IGNORED',
//         };
//         expect(responseBodySnapshot).toMatchSnapshot();
//     });

//     afterAll(async () => {
//         await app.close();
//     });
// });

// TODO test add to database
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
        console.log('response.body');
        console.log(response.body);
    });

    it('/tasks/:id (GET)', async () => {
        // Assuming there is a task with ID '2e5c1c3e-0b04-4fab-9fd5-db08f959074e' in your database
        const taskId = '2e5c1c3e-0b04-4fab-9fd5-db08f959074e';
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
        // Assuming there is a task with ID '2e5c1c3e-0b04-4fab-9fd5-db08f959074e' in your database
        const taskId = '2e5c1c3e-0b04-4fab-9fd5-db08f959074e';
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

    it('/tasks/:id (DELETE)', async () => {
        // Assuming there is a task with ID '2e5c1c3e-0b04-4fab-9fd5-db08f959074e' in your database
        const taskId = '2e5c1c3e-0b04-4fab-9fd5-db08f959074e';
        const response = await request(app.getHttpServer()).delete(
            `/tasks/${taskId}`,
        );
        expect(response.status).toBe(200);
        // Add more specific assertions based on your application logic
    });

    afterAll(async () => {
        await app.close();
    });
});
